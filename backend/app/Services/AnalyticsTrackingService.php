<?php

namespace App\Services;

use App\Models\AnalyticsEvent;
use App\Models\AnalyticsGeoLocation;
use App\Models\AnalyticsPageView;
use App\Models\AnalyticsSession;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AnalyticsTrackingService
{
    public function track(Request $request): array
    {
        $data = $request->validate([
            'type' => ['required', 'in:page_view,event'],
            'sessionId' => ['required', 'string', 'max:120'],
            'visitorId' => ['required', 'string', 'max:120'],
            'url' => ['nullable', 'string', 'max:2000'],
            'path' => ['nullable', 'string', 'max:500'],
            'title' => ['nullable', 'string', 'max:500'],
            'referrer' => ['nullable', 'string', 'max:2000'],
            'eventType' => ['nullable', 'string', 'max:120'],
            'eventName' => ['nullable', 'string', 'max:120'],
            'label' => ['nullable', 'string', 'max:500'],
            'targetUrl' => ['nullable', 'string', 'max:2000'],
            'metadata' => ['nullable', 'array'],
            'durationSeconds' => ['nullable', 'integer', 'min:0', 'max:86400'],
        ]);

        $ua = (string) $request->userAgent();
        $url = $data['url'] ?? '';
        $path = $data['path'] ?? parse_url($url, PHP_URL_PATH) ?: '/';
        $query = parse_url($url, PHP_URL_QUERY) ?: null;
        parse_str($query ?: '', $queryParams);
        $referrer = $data['referrer'] ?? $request->headers->get('referer');
        $ip = $this->ipAddress($request);
        $ipHash = hash('sha256', $ip.'|'.config('app.key'));
        $agent = $this->parseUserAgent($ua);
        $source = $this->source($referrer, $queryParams);
        $geo = $this->geo($request, $ip, $ipHash);

        $isReturning = AnalyticsSession::query()
            ->where('visitor_id', $data['visitorId'])
            ->where('session_id', '!=', $data['sessionId'])
            ->exists();

        $session = AnalyticsSession::query()->firstOrCreate(
            ['session_id' => $data['sessionId']],
            [
                'visitor_id' => $data['visitorId'],
                'ip_hash' => $ipHash,
                'user_agent' => $ua,
                'device' => $agent['device'],
                'browser' => $agent['browser'],
                'os' => $agent['os'],
                'country' => $geo['country'],
                'city' => $geo['city'],
                'referrer' => $referrer,
                'source' => $source['source'],
                'medium' => $source['medium'],
                'campaign' => Arr::get($queryParams, 'utm_campaign'),
                'landing_page' => $path,
                'started_at' => now(),
                'last_seen_at' => now(),
                'is_returning' => $isReturning,
            ]
        );

        $sessionUpdate = ['last_seen_at' => now()];
        if (! $session->country && $geo['country']) {
            $sessionUpdate['country'] = $geo['country'];
        }
        if (! $session->city && $geo['city']) {
            $sessionUpdate['city'] = $geo['city'];
        }
        $session->forceFill($sessionUpdate)->save();

        if ($data['type'] === 'event') {
            AnalyticsEvent::create([
                'analytics_session_id' => $session->id,
                'session_id' => $session->session_id,
                'visitor_id' => $data['visitorId'],
                'event_type' => Str::slug($data['eventType'] ?? 'click', '_'),
                'event_name' => $data['eventName'] ?? null,
                'label' => $data['label'] ?? null,
                'target_url' => $data['targetUrl'] ?? null,
                'path' => $path,
                'metadata' => $data['metadata'] ?? null,
                'occurred_at' => now(),
            ]);
            $session->increment('event_count');

            return ['tracked' => true];
        }

        AnalyticsPageView::create([
            'analytics_session_id' => $session->id,
            'session_id' => $session->session_id,
            'visitor_id' => $data['visitorId'],
            'ip_hash' => $ipHash,
            'full_url' => $url ?: $path,
            'path' => $path,
            'query_string' => $query,
            'title' => $data['title'] ?? null,
            'referrer' => $referrer,
            'source' => $source['source'],
            'medium' => $source['medium'],
            'campaign' => Arr::get($queryParams, 'utm_campaign'),
            'utm_content' => Arr::get($queryParams, 'utm_content'),
            'utm_term' => Arr::get($queryParams, 'utm_term'),
            'country' => $geo['country'],
            'city' => $geo['city'],
            'device' => $agent['device'],
            'browser' => $agent['browser'],
            'os' => $agent['os'],
            'duration_seconds' => $data['durationSeconds'] ?? null,
            'viewed_at' => now(),
        ]);
        $session->increment('page_view_count');

        return ['tracked' => true];
    }

    private function parseUserAgent(string $ua): array
    {
        $lower = strtolower($ua);

        return [
            'device' => str_contains($lower, 'mobile') || str_contains($lower, 'android') || str_contains($lower, 'iphone') ? 'Mobile' : (str_contains($lower, 'tablet') || str_contains($lower, 'ipad') ? 'Tablet' : 'Desktop'),
            'browser' => str_contains($lower, 'edg/') ? 'Edge' : (str_contains($lower, 'chrome/') ? 'Chrome' : (str_contains($lower, 'safari/') ? 'Safari' : (str_contains($lower, 'firefox/') ? 'Firefox' : 'Other'))),
            'os' => str_contains($lower, 'windows') ? 'Windows' : (str_contains($lower, 'mac os') ? 'macOS' : (str_contains($lower, 'android') ? 'Android' : (str_contains($lower, 'iphone') || str_contains($lower, 'ipad') ? 'iOS' : (str_contains($lower, 'linux') ? 'Linux' : 'Other')))),
        ];
    }

    private function source(?string $referrer, array $query): array
    {
        if (! empty($query['utm_source'])) {
            return ['source' => $query['utm_source'], 'medium' => $query['utm_medium'] ?? 'campaign'];
        }
        if (! $referrer) {
            return ['source' => 'Direct', 'medium' => 'direct'];
        }

        $host = strtolower(parse_url($referrer, PHP_URL_HOST) ?: $referrer);
        if (str_contains($host, 'instagram')) return ['source' => 'Instagram', 'medium' => 'social'];
        if (str_contains($host, 'facebook')) return ['source' => 'Facebook', 'medium' => 'social'];
        if (str_contains($host, 'google') || str_contains($host, 'bing') || str_contains($host, 'yahoo')) return ['source' => $host, 'medium' => 'organic'];

        return ['source' => $host, 'medium' => 'referral'];
    }

    private function ipAddress(Request $request): string
    {
        $forwarded = $request->headers->get('CF-Connecting-IP')
            ?: $request->headers->get('X-Real-IP')
            ?: $request->headers->get('X-Forwarded-For');

        if ($forwarded) {
            $ip = trim(explode(',', $forwarded)[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }

        return (string) $request->ip();
    }

    private function geo(Request $request, string $ip, string $ipHash): array
    {
        $headerCountry = $request->headers->get('CF-IPCountry') ?: $request->headers->get('X-Country');
        $headerCity = $request->headers->get('X-City');

        if ($headerCountry && strtoupper($headerCountry) !== 'XX') {
            return ['country' => $headerCountry, 'city' => $headerCity];
        }

        $cached = AnalyticsGeoLocation::query()->where('ip_hash', $ipHash)->first();
        if ($cached && $cached->looked_up_at && $cached->looked_up_at->gt(now()->subDays(30))) {
            return ['country' => $cached->country, 'city' => $cached->city];
        }

        if (! $this->isPublicIp($ip)) {
            return ['country' => null, 'city' => null];
        }

        $geo = ['country' => null, 'city' => null];

        try {
            $response = Http::timeout(2)->acceptJson()->get("https://ipapi.co/{$ip}/json/");
            if ($response->ok() && ! $response->json('error')) {
                $geo = [
                    'country' => $response->json('country_name'),
                    'city' => $response->json('city'),
                ];
            }
        } catch (\Throwable) {
            $geo = ['country' => null, 'city' => null];
        }

        AnalyticsGeoLocation::query()->updateOrCreate(
            ['ip_hash' => $ipHash],
            ['country' => $geo['country'], 'city' => $geo['city'], 'looked_up_at' => now()]
        );

        return $geo;
    }

    private function isPublicIp(string $ip): bool
    {
        return filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false;
    }
}

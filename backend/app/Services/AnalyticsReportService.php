<?php

namespace App\Services;

use App\Models\AnalyticsEvent;
use App\Models\AnalyticsPageView;
use App\Models\AnalyticsSession;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsReportService
{
    public function range(Request $request): array
    {
        return [
            $request->date('start_date')?->startOfDay() ?? now()->subDays(29)->startOfDay(),
            $request->date('end_date')?->endOfDay() ?? now()->endOfDay(),
        ];
    }

    public function overview(Request $request): array
    {
        [$start, $end] = $this->range($request);
        $sessions = AnalyticsSession::query()->whereBetween('started_at', [$start, $end]);
        $views = AnalyticsPageView::query()->whereBetween('viewed_at', [$start, $end]);
        $events = AnalyticsEvent::query()->whereBetween('occurred_at', [$start, $end]);

        $totalSessions = (clone $sessions)->count();
        $pageViews = (clone $views)->count();
        $uniqueVisitors = (clone $sessions)->distinct('visitor_id')->count('visitor_id');
        $singlePageSessions = (clone $sessions)->where('page_view_count', '<=', 1)->count();

        return [
            'totals' => [
                'visitors' => $totalSessions,
                'pageViews' => $pageViews,
                'uniqueVisitors' => $uniqueVisitors,
                'returningVisitors' => (clone $sessions)->where('is_returning', true)->count(),
                'newVisitors' => (clone $sessions)->where('is_returning', false)->count(),
                'averageSessionDuration' => round((float) (clone $views)->avg('duration_seconds')),
                'bounceRate' => $totalSessions > 0 ? round(($singlePageSessions / $totalSessions) * 100, 1) : 0,
                'events' => (clone $events)->count(),
            ],
            'trend' => $this->trend($start, $end),
            'topPages' => $this->topGroup(clone $views, 'path'),
            'topSources' => $this->topGroup(clone $sessions, 'source'),
            'topCountries' => $this->topGroup(clone $sessions, 'country'),
            'topDevices' => $this->topGroup(clone $sessions, 'device'),
            'topBrowsers' => $this->topGroup(clone $sessions, 'browser'),
            'eventSummary' => $this->topGroup(clone $events, 'event_type'),
        ];
    }

    public function traffic(Request $request)
    {
        [$start, $end] = $this->range($request);
        $query = AnalyticsPageView::query()->whereBetween('viewed_at', [$start, $end])->latest('viewed_at');
        $this->applyFilters($query, $request, ['country', 'city', 'path', 'device', 'browser', 'source'], ['path', 'full_url', 'referrer']);

        return $query->paginate((int) $request->input('per_page', 20));
    }

    public function pages(Request $request): array
    {
        [$start, $end] = $this->range($request);

        $pages = AnalyticsPageView::query()
            ->select('path', DB::raw('COUNT(*) as views'), DB::raw('COUNT(DISTINCT visitor_id) as uniqueVisitors'), DB::raw('AVG(duration_seconds) as averageTime'))
            ->whereBetween('viewed_at', [$start, $end])
            ->groupBy('path')
            ->orderByDesc('views')
            ->paginate((int) $request->input('per_page', 20));

        return [
            'pages' => $pages,
            'landingPages' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'landing_page'),
            'exitPages' => $this->topGroup(AnalyticsPageView::query()->whereBetween('viewed_at', [$start, $end])->where('is_exit', true), 'path'),
        ];
    }

    public function events(Request $request)
    {
        [$start, $end] = $this->range($request);
        $query = AnalyticsEvent::query()->whereBetween('occurred_at', [$start, $end])->latest('occurred_at');
        $this->applyFilters($query, $request, ['event_type', 'event_name', 'path'], ['path', 'label', 'event_name']);

        return [
            'summary' => $this->topGroup(AnalyticsEvent::query()->whereBetween('occurred_at', [$start, $end]), 'event_type'),
            'events' => $query->paginate((int) $request->input('per_page', 20)),
        ];
    }

    public function audience(Request $request): array
    {
        [$start, $end] = $this->range($request);
        return [
            'countries' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'country'),
            'cities' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'city'),
            'devices' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'device'),
            'browsers' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'browser'),
            'os' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'os'),
            'hours' => AnalyticsPageView::query()->select(DB::raw('HOUR(viewed_at) as name'), DB::raw('COUNT(*) as value'))->whereBetween('viewed_at', [$start, $end])->groupBy('name')->orderBy('name')->get(),
            'days' => AnalyticsPageView::query()->select(DB::raw('DATE(viewed_at) as name'), DB::raw('COUNT(*) as value'))->whereBetween('viewed_at', [$start, $end])->groupBy('name')->orderBy('name')->get(),
        ];
    }

    public function sources(Request $request): array
    {
        [$start, $end] = $this->range($request);

        return [
            'sources' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'source'),
            'mediums' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'medium'),
            'campaigns' => $this->topGroup(AnalyticsSession::query()->whereBetween('started_at', [$start, $end]), 'campaign'),
        ];
    }

    public function insights(Request $request): array
    {
        $overview = $this->overview($request);
        $insights = [];
        $totals = $overview['totals'];

        if ($totals['bounceRate'] >= 60) {
            $insights[] = ['title' => 'Bounce rate tinggi', 'description' => "Bounce rate saat ini {$totals['bounceRate']}%. Periksa halaman dengan exit tinggi dan perkuat CTA di area atas halaman."];
        }
        if (($overview['topDevices'][0]['name'] ?? null) === 'Mobile') {
            $value = $overview['topDevices'][0]['value'] ?? 0;
            $insights[] = ['title' => 'Traffic mobile dominan', 'description' => "Mobile menjadi device terbesar dengan {$value} sesi. Prioritaskan performa, ukuran gambar, dan CTA mobile."];
        }
        if (($overview['topSources'][0]['name'] ?? null) === 'Instagram') {
            $value = $overview['topSources'][0]['value'] ?? 0;
            $insights[] = ['title' => 'Instagram kuat sebagai sumber traffic', 'description' => "Instagram menyumbang {$value} sesi. Gunakan UTM link dan arahkan konten Instagram ke halaman service/portfolio yang relevan."];
        }

        $articleViews = AnalyticsPageView::query()->where('path', 'like', '/articles/%')->count();
        $articleCta = AnalyticsEvent::query()->where('path', 'like', '/articles/%')->whereIn('event_type', ['cta_click', 'whatsapp_click'])->count();
        if ($articleViews > 0 && $articleCta === 0) {
            $insights[] = ['title' => 'Artikel belum menghasilkan klik CTA', 'description' => "Artikel mendapat {$articleViews} views tetapi belum ada klik CTA/WhatsApp. Tambahkan CTA yang lebih jelas di dalam artikel."];
        }

        if (empty($insights)) {
            $insights[] = ['title' => 'Data belum cukup untuk insight kuat', 'description' => 'Insight akan semakin akurat setelah traffic dan event publik terkumpul lebih banyak di database.'];
        }

        return $insights;
    }

    private function trend($start, $end)
    {
        return AnalyticsPageView::query()
            ->select(DB::raw('DATE(viewed_at) as d'), DB::raw('COUNT(*) as v'), DB::raw('COUNT(DISTINCT visitor_id) as p'), DB::raw('COUNT(DISTINCT session_id) as s'))
            ->whereBetween('viewed_at', [$start, $end])
            ->groupBy('d')
            ->orderBy('d')
            ->get();
    }

    private function topGroup(Builder $query, string $column, int $limit = 8)
    {
        return $query->selectRaw("COALESCE(NULLIF({$column}, ''), 'Unknown') as name, COUNT(*) as value")
            ->groupBy('name')
            ->orderByDesc('value')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    private function applyFilters(Builder $query, Request $request, array $columns, array $searchColumns = ['path']): void
    {
        foreach ($columns as $column) {
            $value = $request->input($column);
            if ($value) {
                $query->where($column, $value);
            }
        }
        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search, $searchColumns): void {
                foreach ($searchColumns as $index => $column) {
                    $method = $index === 0 ? 'where' : 'orWhere';
                    $q->{$method}($column, 'like', "%{$search}%");
                }
            });
        }
    }
}

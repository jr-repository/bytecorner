<?php

namespace App\Http\Middleware;

use App\Models\AdminToken;
use App\Services\ApiResponseService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $plainToken = $request->bearerToken();

        if (! $plainToken) {
            return ApiResponseService::error('Unauthenticated.', null, 401);
        }

        $token = AdminToken::query()
            ->with('adminUser')
            ->where('token_hash', hash('sha256', $plainToken))
            ->first();

        if (! $token || ($token->expires_at && $token->expires_at->isPast()) || $token->adminUser?->status !== 'active') {
            return ApiResponseService::error('Unauthenticated.', null, 401);
        }

        $token->forceFill(['last_used_at' => now()])->save();
        $request->attributes->set('AdminUser', $token->adminUser);
        $request->attributes->set('AdminToken', $token);

        return $next($request);
    }
}

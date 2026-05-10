<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsTrackingService;
use App\Services\ApiResponseService;
use Illuminate\Http\Request;

class AnalyticsTrackingController extends Controller
{
    public function __invoke(Request $request, AnalyticsTrackingService $tracking)
    {
        return ApiResponseService::success($tracking->track($request), 'Tracked.');
    }
}

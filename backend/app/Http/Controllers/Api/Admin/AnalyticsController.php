<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsReportService;
use App\Services\ApiResponseService;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function overview(Request $request, AnalyticsReportService $analytics)
    {
        return ApiResponseService::success($analytics->overview($request));
    }

    public function traffic(Request $request, AnalyticsReportService $analytics)
    {
        return ApiResponseService::success($analytics->traffic($request));
    }

    public function pages(Request $request, AnalyticsReportService $analytics)
    {
        return ApiResponseService::success($analytics->pages($request));
    }

    public function events(Request $request, AnalyticsReportService $analytics)
    {
        return ApiResponseService::success($analytics->events($request));
    }

    public function audience(Request $request, AnalyticsReportService $analytics)
    {
        return ApiResponseService::success($analytics->audience($request));
    }

    public function sources(Request $request, AnalyticsReportService $analytics)
    {
        return ApiResponseService::success($analytics->sources($request));
    }

    public function insights(Request $request, AnalyticsReportService $analytics)
    {
        return ApiResponseService::success($analytics->insights($request));
    }
}

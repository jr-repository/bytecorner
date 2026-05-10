<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\PortfolioResource;
use App\Http\Resources\ServiceResource;
use App\Models\Article;
use App\Models\ClientLogo;
use App\Models\PortfolioProject;
use App\Models\ServiceItem;
use App\Services\AnalyticsReportService;
use App\Services\ApiResponseService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request, AnalyticsReportService $analytics)
    {
        $services = ServiceItem::all();
        $portfolio = PortfolioProject::all();
        $articles = Article::all();
        $logos = ClientLogo::all();

        $latest = collect()
            ->merge($services->sortByDesc('created_at')->take(3)->map(fn ($item) => [
                't' => $item->title_id,
                'type' => 'Service',
                'status' => $item->status,
                'date' => optional($item->created_at)->format('Y-m-d') ?: '—',
            ]))
            ->merge($portfolio->sortByDesc('created_at')->take(3)->map(fn ($item) => [
                't' => $item->title_id,
                'type' => 'Portfolio',
                'status' => $item->status,
                'date' => optional($item->project_date)->format('Y-m-d') ?: '—',
            ]))
            ->merge($articles->sortByDesc('created_at')->take(3)->map(fn ($item) => [
                't' => $item->title_id,
                'type' => 'Article',
                'status' => $item->status,
                'date' => optional($item->published_date)->format('Y-m-d') ?: '—',
            ]))
            ->sortByDesc('date')
            ->values()
            ->take(6);

        $overview = $analytics->overview($request);

        return ApiResponseService::success([
            'totals' => [
                'services' => $services->count(),
                'portfolio' => $portfolio->count(),
                'articles' => $articles->count(),
                'clients' => $logos->count(),
                'publishedServices' => $services->where('status', 'published')->count(),
                'publishedPortfolio' => $portfolio->where('status', 'published')->count(),
                'publishedArticles' => $articles->where('status', 'published')->count(),
                'visitors' => $overview['totals']['visitors'],
                'pageViews' => $overview['totals']['pageViews'],
                'uniqueVisitors' => $overview['totals']['uniqueVisitors'],
                'events' => $overview['totals']['events'],
            ],
            'latestContent' => $latest,
            'latestServices' => ServiceResource::collection($services->sortByDesc('created_at')->take(5)),
            'latestPortfolios' => PortfolioResource::collection($portfolio->sortByDesc('created_at')->take(5)),
            'latestArticles' => ArticleResource::collection($articles->sortByDesc('created_at')->take(5)),
            'statusCounts' => [
                'services' => $services->countBy('status'),
                'portfolio' => $portfolio->countBy('status'),
                'articles' => $articles->countBy('status'),
            ],
            'categorySummaries' => [
                'services' => $services->countBy('category'),
                'portfolio' => $portfolio->countBy('category'),
                'articles' => $articles->countBy('category'),
            ],
            'monthlyActivity' => $this->monthlyActivity($services, $portfolio, $articles),
            'trend' => $overview['trend'],
            'topPages' => collect($overview['topPages'])->map(fn ($row, $i) => ['name' => $row['name'], 'v' => $row['value'], 'c' => ['#6CC6CB', '#4FB7C5', '#A7F3D0', '#FFD6A5', '#EAE5C9'][$i % 5]])->values(),
        ]);
    }

    private function monthlyActivity($services, $portfolio, $articles): array
    {
        return collect(range(5, 0))
            ->map(function (int $minus) use ($services, $portfolio, $articles): array {
                $month = now()->subMonths($minus);
                $key = $month->format('Y-m');

                return [
                    'month' => $month->format('M'),
                    'services' => $services->filter(fn ($item) => optional($item->created_at)->format('Y-m') === $key)->count(),
                    'portfolio' => $portfolio->filter(fn ($item) => optional($item->created_at)->format('Y-m') === $key)->count(),
                    'articles' => $articles->filter(fn ($item) => optional($item->created_at)->format('Y-m') === $key)->count(),
                ];
            })
            ->values()
            ->all();
    }
}

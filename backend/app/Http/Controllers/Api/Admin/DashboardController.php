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
use App\Services\ApiResponseService;

class DashboardController extends Controller
{
    public function __invoke()
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

        return ApiResponseService::success([
            'totals' => [
                'services' => $services->count(),
                'portfolio' => $portfolio->count(),
                'articles' => $articles->count(),
                'clients' => $logos->count(),
                'publishedServices' => $services->where('status', 'published')->count(),
                'publishedPortfolio' => $portfolio->where('status', 'published')->count(),
                'publishedArticles' => $articles->where('status', 'published')->count(),
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
            'trend' => [
                ['d' => 'Mon', 'v' => 4200, 'p' => 3100, 's' => 1800],
                ['d' => 'Tue', 'v' => 4800, 'p' => 3600, 's' => 2100],
                ['d' => 'Wed', 'v' => 5400, 'p' => 4100, 's' => 2400],
                ['d' => 'Thu', 'v' => 6100, 'p' => 4700, 's' => 2700],
                ['d' => 'Fri', 'v' => 5800, 'p' => 4500, 's' => 2500],
                ['d' => 'Sat', 'v' => 6400, 'p' => 5000, 's' => 2900],
                ['d' => 'Sun', 'v' => 7100, 'p' => 5400, 's' => 3200],
            ],
            'topPages' => [
                ['name' => '/', 'v' => 28592, 'c' => '#6CC6CB'],
                ['name' => '/services', 'v' => 16421, 'c' => '#4FB7C5'],
                ['name' => '/portfolio', 'v' => 13876, 'c' => '#A7F3D0'],
                ['name' => '/articles', 'v' => 8358, 'c' => '#FFD6A5'],
                ['name' => 'Others', 'v' => 4000, 'c' => '#EAE5C9'],
            ],
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

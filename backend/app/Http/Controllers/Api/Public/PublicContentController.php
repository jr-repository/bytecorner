<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ClientLogoResource;
use App\Http\Resources\PortfolioResource;
use App\Http\Resources\ServiceResource;
use App\Models\Article;
use App\Models\ClientLogo;
use App\Models\PortfolioProject;
use App\Models\ServiceItem;
use App\Services\ApiResponseService;
use Illuminate\Http\Request;

class PublicContentController extends Controller
{
    public function services(Request $request)
    {
        $query = ServiceItem::query()->where('status', 'published');
        $this->contentFilters($query, $request);

        return ApiResponseService::success(ServiceResource::collection($query->get()));
    }

    public function service(string $slug)
    {
        $service = ServiceItem::query()->where('status', 'published')->where('slug', $slug)->firstOrFail();

        return ApiResponseService::success(new ServiceResource($service));
    }

    public function portfolio(Request $request)
    {
        $query = PortfolioProject::query()->where('status', 'published');
        $this->contentFilters($query, $request);

        return ApiResponseService::success(PortfolioResource::collection($query->get()));
    }

    public function portfolioItem(string $slug)
    {
        $portfolio = PortfolioProject::query()->where('status', 'published')->where('slug', $slug)->firstOrFail();

        return ApiResponseService::success(new PortfolioResource($portfolio));
    }

    public function articles(Request $request)
    {
        $query = Article::query()->where('status', 'published');
        $this->contentFilters($query, $request);
        $query->orderByDesc('published_date');

        return ApiResponseService::success(ArticleResource::collection($query->get()));
    }

    public function article(string $slug)
    {
        $article = Article::query()->where('status', 'published')->where('slug', $slug)->firstOrFail();

        return ApiResponseService::success(new ArticleResource($article));
    }

    public function logos(Request $request)
    {
        $logos = ClientLogo::query()
            ->where('status', 'active')
            ->when($request->filled('search'), fn ($q) => $q->where('name', 'like', '%'.$request->string('search').'%'))
            ->orderBy('sort_order')
            ->latest()
            ->get();

        return ApiResponseService::success(ClientLogoResource::collection($logos));
    }

    public function stats()
    {
        return ApiResponseService::success([
            'services' => ServiceItem::where('status', 'published')->count(),
            'portfolio' => PortfolioProject::where('status', 'published')->count(),
            'articles' => Article::where('status', 'published')->count(),
            'clients' => ClientLogo::where('status', 'active')->count(),
        ]);
    }

    private function contentFilters($query, Request $request): void
    {
        $query->when($request->filled('search'), function ($q) use ($request): void {
            $search = $request->string('search');
            $q->where(fn ($inner) => $inner
                ->where('title_id', 'like', "%{$search}%")
                ->orWhere('title_en', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%"));
        })->when($request->filled('category'), fn ($q) => $q->where('category', $request->string('category')))
            ->when($request->filled('featured'), fn ($q) => $q->where('featured', $request->boolean('featured')))
            ->orderBy('sort_order')
            ->latest();
    }
}

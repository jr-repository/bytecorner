<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PortfolioRequest;
use App\Http\Resources\PortfolioResource;
use App\Models\PortfolioProject;
use App\Services\ApiResponseService;
use App\Services\SlugService;
use App\Services\UploadService;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $query = PortfolioProject::query();
        $this->filters($query, $request);

        return ApiResponseService::success(PortfolioResource::collection($query->get()));
    }

    public function store(PortfolioRequest $request, SlugService $slugs, UploadService $uploads)
    {
        $portfolio = PortfolioProject::create($this->payload($request->validated(), $slugs, $uploads));

        return ApiResponseService::success(new PortfolioResource($portfolio), 'Portfolio created.', 201);
    }

    public function show(PortfolioProject $portfolio)
    {
        return ApiResponseService::success(new PortfolioResource($portfolio));
    }

    public function update(PortfolioRequest $request, PortfolioProject $portfolio, SlugService $slugs, UploadService $uploads)
    {
        $portfolio->update($this->payload($request->validated(), $slugs, $uploads, $portfolio));

        return ApiResponseService::success(new PortfolioResource($portfolio->fresh()), 'Portfolio updated.');
    }

    public function destroy(PortfolioProject $portfolio)
    {
        $portfolio->delete();

        return ApiResponseService::success(null, 'Portfolio deleted.');
    }

    private function payload(array $data, SlugService $slugs, UploadService $uploads, ?PortfolioProject $portfolio = null): array
    {
        $title = $data['title'];
        $slug = $data['slug'] ?? null;
        $projectUrl = $data['projectUrl'] ?? $data['url'] ?? null;

        return [
            'slug' => $slugs->unique(PortfolioProject::class, $slug ?: ($title['en'] ?: $title['id']), $portfolio?->id),
            'client' => $data['client'],
            'category' => $data['category'],
            'title_id' => $title['id'],
            'title_en' => $title['en'],
            'description_id' => $data['description']['id'] ?? $data['description']['en'] ?? '',
            'description_en' => $data['description']['en'] ?? $data['description']['id'] ?? '',
            'overview_id' => $data['overview']['id'] ?? $data['overview']['en'] ?? '',
            'overview_en' => $data['overview']['en'] ?? $data['overview']['id'] ?? '',
            'challenge_id' => $data['challenge']['id'] ?? $data['challenge']['en'] ?? '',
            'challenge_en' => $data['challenge']['en'] ?? $data['challenge']['id'] ?? '',
            'solution_id' => $data['solution']['id'] ?? $data['solution']['en'] ?? '',
            'solution_en' => $data['solution']['en'] ?? $data['solution']['id'] ?? '',
            'tech_stack' => array_values($data['techStack'] ?? []),
            'project_date' => $data['date'] ?? null,
            'project_url' => $projectUrl,
            'preview_url' => $data['previewUrl'] ?? $projectUrl,
            'main_image' => array_key_exists('cover', $data) ? $uploads->imageFromInput($data['cover'], 'portfolio') : $portfolio?->main_image,
            'gallery' => array_key_exists('gallery', $data) ? $uploads->imagesFromArray($data['gallery'] ?? [], 'portfolio/gallery') : ($portfolio?->gallery ?? []),
            'metrics' => $data['metrics'] ?? null,
            'status' => $data['status'],
            'featured' => (bool) ($data['featured'] ?? false),
            'sort_order' => (int) ($data['sortOrder'] ?? $data['sort_order'] ?? 0),
        ];
    }

    private function filters($query, Request $request): void
    {
        $query->when($request->filled('search'), function ($q) use ($request): void {
            $search = $request->string('search');
            $q->where(fn ($inner) => $inner
                ->where('title_id', 'like', "%{$search}%")
                ->orWhere('title_en', 'like', "%{$search}%")
                ->orWhere('client', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%"));
        })->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->when($request->filled('category'), fn ($q) => $q->where('category', $request->string('category')))
            ->when($request->filled('featured'), fn ($q) => $q->where('featured', $request->boolean('featured')))
            ->orderBy('sort_order')
            ->latest();
    }
}

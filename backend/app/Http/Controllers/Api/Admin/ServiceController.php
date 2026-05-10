<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\ServiceItem;
use App\Services\ApiResponseService;
use App\Services\SlugService;
use App\Services\UploadService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = ServiceItem::query();
        $this->filters($query, $request);

        return ApiResponseService::success(ServiceResource::collection($query->get()));
    }

    public function store(ServiceRequest $request, SlugService $slugs, UploadService $uploads)
    {
        $service = ServiceItem::create($this->payload($request->validated(), $slugs, $uploads));

        return ApiResponseService::success(new ServiceResource($service), 'Service created.', 201);
    }

    public function show(ServiceItem $service)
    {
        return ApiResponseService::success(new ServiceResource($service));
    }

    public function update(ServiceRequest $request, ServiceItem $service, SlugService $slugs, UploadService $uploads)
    {
        $service->update($this->payload($request->validated(), $slugs, $uploads, $service));

        return ApiResponseService::success(new ServiceResource($service->fresh()), 'Service updated.');
    }

    public function destroy(ServiceItem $service)
    {
        $service->delete();

        return ApiResponseService::success(null, 'Service deleted.');
    }

    private function payload(array $data, SlugService $slugs, UploadService $uploads, ?ServiceItem $service = null): array
    {
        $title = $data['title'];
        $slug = $data['slug'] ?? null;

        return [
            'slug' => $slugs->unique(ServiceItem::class, $slug ?: ($title['en'] ?: $title['id']), $service?->id),
            'category' => $data['category'],
            'title_id' => $title['id'],
            'title_en' => $title['en'],
            'excerpt_id' => $data['excerpt']['id'] ?? $data['excerpt']['en'] ?? '',
            'excerpt_en' => $data['excerpt']['en'] ?? $data['excerpt']['id'] ?? '',
            'description_id' => $data['description']['id'] ?? $data['description']['en'] ?? '',
            'description_en' => $data['description']['en'] ?? $data['description']['id'] ?? '',
            'icon' => $data['icon'] ?? 'Sparkles',
            'main_image' => array_key_exists('image', $data) ? $uploads->imageFromInput($data['image'], 'services') : $service?->main_image,
            'features' => array_values($data['features'] ?? []),
            'faq' => array_values($data['faq'] ?? []),
            'cta' => $data['cta'] ?? null,
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
                ->orWhere('category', 'like', "%{$search}%"));
        })->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->when($request->filled('category'), fn ($q) => $q->where('category', $request->string('category')))
            ->when($request->filled('featured'), fn ($q) => $q->where('featured', $request->boolean('featured')))
            ->orderBy('sort_order')
            ->latest();
    }
}

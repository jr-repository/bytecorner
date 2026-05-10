<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\ApiResponseService;
use App\Services\SlugService;
use App\Services\UploadService;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();
        $this->filters($query, $request);

        return ApiResponseService::success(ArticleResource::collection($query->get()));
    }

    public function store(ArticleRequest $request, SlugService $slugs, UploadService $uploads)
    {
        $article = Article::create($this->payload($request->validated(), $slugs, $uploads));

        return ApiResponseService::success(new ArticleResource($article), 'Article created.', 201);
    }

    public function show(Article $article)
    {
        return ApiResponseService::success(new ArticleResource($article));
    }

    public function update(ArticleRequest $request, Article $article, SlugService $slugs, UploadService $uploads)
    {
        $article->update($this->payload($request->validated(), $slugs, $uploads, $article));

        return ApiResponseService::success(new ArticleResource($article->fresh()), 'Article updated.');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return ApiResponseService::success(null, 'Article deleted.');
    }

    private function payload(array $data, SlugService $slugs, UploadService $uploads, ?Article $article = null): array
    {
        $title = $data['title'];
        $slug = $data['slug'] ?? null;

        return [
            'slug' => $slugs->unique(Article::class, $slug ?: ($title['en'] ?: $title['id']), $article?->id),
            'title_id' => $title['id'],
            'title_en' => $title['en'],
            'excerpt_id' => $data['excerpt']['id'] ?? $data['excerpt']['en'] ?? '',
            'excerpt_en' => $data['excerpt']['en'] ?? $data['excerpt']['id'] ?? '',
            'content_id' => $data['content']['id'] ?? $data['content']['en'] ?? '',
            'content_en' => $data['content']['en'] ?? $data['content']['id'] ?? '',
            'category' => $data['category'],
            'author' => $data['author'],
            'author_avatar' => array_key_exists('authorAvatar', $data) ? $uploads->imageFromInput($data['authorAvatar'], 'authors') : $article?->author_avatar,
            'published_date' => $data['date'] ?? null,
            'reading_time' => (int) $data['readingTime'],
            'featured_image' => array_key_exists('cover', $data) ? $uploads->imageFromInput($data['cover'], 'articles') : $article?->featured_image,
            'images' => array_key_exists('images', $data) ? $uploads->imagesFromArray($data['images'] ?? [], 'articles/gallery') : ($article?->images ?? []),
            'tags' => array_values($data['tags'] ?? []),
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
                ->orWhere('author', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%"));
        })->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->when($request->filled('category'), fn ($q) => $q->where('category', $request->string('category')))
            ->when($request->filled('featured'), fn ($q) => $q->where('featured', $request->boolean('featured')))
            ->orderByDesc('published_date')
            ->orderBy('sort_order');
    }
}

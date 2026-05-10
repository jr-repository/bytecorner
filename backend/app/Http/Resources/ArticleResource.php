<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'slug' => $this->slug,
            'title' => ['id' => $this->title_id, 'en' => $this->title_en],
            'excerpt' => ['id' => $this->excerpt_id ?? '', 'en' => $this->excerpt_en ?? ''],
            'content' => ['id' => $this->content_id ?? '', 'en' => $this->content_en ?? ''],
            'category' => $this->category,
            'author' => $this->author,
            'authorAvatar' => $this->author_avatar,
            'date' => optional($this->published_date)->format('Y-m-d'),
            'cover' => $this->featured_image,
            'images' => $this->images ?? [],
            'tags' => $this->tags ?? [],
            'featured' => (bool) $this->featured,
            'readingTime' => (int) $this->reading_time,
            'status' => $this->status,
            'sortOrder' => (int) $this->sort_order,
            'createdAt' => optional($this->created_at)->toISOString(),
            'updatedAt' => optional($this->updated_at)->toISOString(),
        ];
    }
}

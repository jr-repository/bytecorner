<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'slug' => $this->slug,
            'category' => $this->category,
            'title' => ['id' => $this->title_id, 'en' => $this->title_en],
            'excerpt' => ['id' => $this->excerpt_id ?? '', 'en' => $this->excerpt_en ?? ''],
            'description' => ['id' => $this->description_id ?? '', 'en' => $this->description_en ?? ''],
            'icon' => $this->icon,
            'image' => $this->main_image,
            'features' => $this->features ?? [],
            'faq' => $this->faq ?? [],
            'cta' => $this->cta ?? null,
            'status' => $this->status,
            'featured' => (bool) $this->featured,
            'sortOrder' => (int) $this->sort_order,
            'createdAt' => optional($this->created_at)->toISOString(),
            'updatedAt' => optional($this->updated_at)->toISOString(),
        ];
    }
}

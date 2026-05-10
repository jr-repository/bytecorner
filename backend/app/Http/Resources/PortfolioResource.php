<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $url = $this->preview_url ?: $this->project_url;

        return [
            'id' => (string) $this->id,
            'slug' => $this->slug,
            'client' => $this->client,
            'category' => $this->category,
            'title' => ['id' => $this->title_id, 'en' => $this->title_en],
            'description' => ['id' => $this->description_id ?? '', 'en' => $this->description_en ?? ''],
            'overview' => ['id' => $this->overview_id ?? '', 'en' => $this->overview_en ?? ''],
            'challenge' => ['id' => $this->challenge_id ?? '', 'en' => $this->challenge_en ?? ''],
            'solution' => ['id' => $this->solution_id ?? '', 'en' => $this->solution_en ?? ''],
            'techStack' => $this->tech_stack ?? [],
            'date' => optional($this->project_date)->format('Y-m-d'),
            'url' => $url,
            'projectUrl' => $this->project_url,
            'previewUrl' => $url,
            'featured' => (bool) $this->featured,
            'cover' => $this->main_image,
            'gallery' => $this->gallery ?? [],
            'status' => $this->status,
            'metrics' => $this->metrics ?? null,
            'sortOrder' => (int) $this->sort_order,
            'createdAt' => optional($this->created_at)->toISOString(),
            'updatedAt' => optional($this->updated_at)->toISOString(),
        ];
    }
}

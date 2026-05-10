<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class PortfolioRequest extends BaseApiRequest
{
    public function rules(): array
    {
        return [
            'slug' => ['nullable', 'string', 'max:190'],
            'client' => ['required', 'string', 'max:190'],
            'category' => ['required', 'string', 'max:120'],
            'title.id' => ['required', 'string', 'max:190'],
            'title.en' => ['required', 'string', 'max:190'],
            'description.id' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'overview.id' => ['nullable', 'string'],
            'overview.en' => ['nullable', 'string'],
            'challenge.id' => ['nullable', 'string'],
            'challenge.en' => ['nullable', 'string'],
            'solution.id' => ['nullable', 'string'],
            'solution.en' => ['nullable', 'string'],
            'techStack' => ['nullable', 'array'],
            'techStack.*' => ['string', 'max:120'],
            'date' => ['nullable', 'date'],
            'url' => ['nullable', 'string', 'max:500'],
            'projectUrl' => ['nullable', 'string', 'max:500'],
            'previewUrl' => ['nullable', 'string', 'max:500'],
            'cover' => ['nullable'],
            'gallery' => ['nullable', 'array'],
            'metrics' => ['nullable', 'array'],
            'status' => ['required', Rule::in(['published', 'draft'])],
            'featured' => ['nullable', 'boolean'],
            'sortOrder' => ['nullable', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}

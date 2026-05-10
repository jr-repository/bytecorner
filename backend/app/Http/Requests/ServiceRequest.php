<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class ServiceRequest extends BaseApiRequest
{
    public function rules(): array
    {
        return [
            'slug' => ['nullable', 'string', 'max:190'],
            'category' => ['required', 'string', 'max:120'],
            'title.id' => ['required', 'string', 'max:190'],
            'title.en' => ['required', 'string', 'max:190'],
            'excerpt.id' => ['nullable', 'string'],
            'excerpt.en' => ['nullable', 'string'],
            'description.id' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:80'],
            'image' => ['nullable'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string', 'max:190'],
            'faq' => ['nullable', 'array'],
            'faq.*.q' => ['nullable', 'string'],
            'faq.*.a' => ['nullable', 'string'],
            'cta' => ['nullable', 'array'],
            'status' => ['required', Rule::in(['published', 'draft'])],
            'featured' => ['nullable', 'boolean'],
            'sortOrder' => ['nullable', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}

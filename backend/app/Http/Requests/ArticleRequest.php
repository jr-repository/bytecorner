<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class ArticleRequest extends BaseApiRequest
{
    public function rules(): array
    {
        return [
            'slug' => ['nullable', 'string', 'max:190'],
            'title.id' => ['required', 'string', 'max:220'],
            'title.en' => ['required', 'string', 'max:220'],
            'excerpt.id' => ['nullable', 'string'],
            'excerpt.en' => ['nullable', 'string'],
            'content.id' => ['nullable', 'string'],
            'content.en' => ['nullable', 'string'],
            'category' => ['required', 'string', 'max:120'],
            'author' => ['required', 'string', 'max:160'],
            'authorAvatar' => ['nullable'],
            'date' => ['nullable', 'date'],
            'cover' => ['nullable'],
            'images' => ['nullable', 'array'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:80'],
            'featured' => ['nullable', 'boolean'],
            'readingTime' => ['required', 'integer', 'min:1', 'max:120'],
            'status' => ['required', Rule::in(['published', 'draft'])],
            'sortOrder' => ['nullable', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}

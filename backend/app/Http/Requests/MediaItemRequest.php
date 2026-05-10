<?php

namespace App\Http\Requests;

class MediaItemRequest extends BaseApiRequest
{
    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:190'],
            'image' => ['required_without:file'],
            'file' => ['required_without:image', 'image', 'max:5120'],
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    protected $table = 'Services';

    protected $fillable = [
        'slug',
        'category',
        'title_id',
        'title_en',
        'excerpt_id',
        'excerpt_en',
        'description_id',
        'description_en',
        'icon',
        'main_image',
        'features',
        'faq',
        'cta',
        'status',
        'featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'faq' => 'array',
            'cta' => 'array',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

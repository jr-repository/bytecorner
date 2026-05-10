<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'Articles';

    protected $fillable = [
        'slug',
        'title_id',
        'title_en',
        'excerpt_id',
        'excerpt_en',
        'content_id',
        'content_en',
        'category',
        'author',
        'author_avatar',
        'published_date',
        'reading_time',
        'featured_image',
        'images',
        'tags',
        'status',
        'featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'published_date' => 'date',
            'reading_time' => 'integer',
            'images' => 'array',
            'tags' => 'array',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

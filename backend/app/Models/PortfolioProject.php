<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    protected $table = 'Portfolio';

    protected $fillable = [
        'slug',
        'client',
        'category',
        'title_id',
        'title_en',
        'description_id',
        'description_en',
        'overview_id',
        'overview_en',
        'challenge_id',
        'challenge_en',
        'solution_id',
        'solution_en',
        'tech_stack',
        'project_date',
        'project_url',
        'preview_url',
        'main_image',
        'gallery',
        'metrics',
        'status',
        'featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'gallery' => 'array',
            'metrics' => 'array',
            'project_date' => 'date',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

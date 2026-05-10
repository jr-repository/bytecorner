<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsPageView extends Model
{
    protected $table = 'AnalyticsPageViews';

    protected $fillable = [
        'analytics_session_id',
        'session_id',
        'visitor_id',
        'ip_hash',
        'full_url',
        'path',
        'query_string',
        'title',
        'referrer',
        'source',
        'medium',
        'campaign',
        'utm_content',
        'utm_term',
        'country',
        'city',
        'device',
        'browser',
        'os',
        'duration_seconds',
        'is_exit',
        'viewed_at',
    ];

    protected function casts(): array
    {
        return [
            'viewed_at' => 'datetime',
            'is_exit' => 'boolean',
            'duration_seconds' => 'integer',
        ];
    }
}

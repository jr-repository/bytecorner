<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsSession extends Model
{
    protected $table = 'AnalyticsSessions';

    protected $fillable = [
        'session_id',
        'visitor_id',
        'ip_hash',
        'user_agent',
        'device',
        'browser',
        'os',
        'country',
        'city',
        'referrer',
        'source',
        'medium',
        'campaign',
        'landing_page',
        'started_at',
        'last_seen_at',
        'page_view_count',
        'event_count',
        'is_returning',
    ];

    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'last_seen_at' => 'datetime',
            'is_returning' => 'boolean',
            'page_view_count' => 'integer',
            'event_count' => 'integer',
        ];
    }
}

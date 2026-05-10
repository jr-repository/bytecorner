<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsEvent extends Model
{
    protected $table = 'AnalyticsEvents';

    protected $fillable = [
        'analytics_session_id',
        'session_id',
        'visitor_id',
        'event_type',
        'event_name',
        'label',
        'target_url',
        'path',
        'metadata',
        'occurred_at',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'occurred_at' => 'datetime',
        ];
    }
}

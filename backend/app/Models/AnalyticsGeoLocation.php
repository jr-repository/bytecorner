<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsGeoLocation extends Model
{
    protected $table = 'AnalyticsGeoLocations';

    protected $fillable = [
        'ip_hash',
        'country',
        'city',
        'looked_up_at',
    ];

    protected function casts(): array
    {
        return [
            'looked_up_at' => 'datetime',
        ];
    }
}

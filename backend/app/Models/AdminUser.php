<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Hidden(['password', 'remember_token'])]
class AdminUser extends Authenticatable
{
    use Notifiable;

    protected $table = 'AdminUsers';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_photo',
        'status',
        'email_verified_at',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tokens()
    {
        return $this->hasMany(AdminToken::class, 'admin_user_id');
    }
}

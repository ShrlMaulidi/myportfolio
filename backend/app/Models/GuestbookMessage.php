<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuestbookMessage extends Model
{
    protected $fillable = [
        'name', 'email', 'avatar', 'message', 'parent_id', 'reactions'
    ];

    protected function casts(): array
    {
        return [
            'reactions' => 'array',
        ];
    }

    public function replies()
    {
        return $this->hasMany(GuestbookMessage::class, 'parent_id')->with('replies');
    }
}

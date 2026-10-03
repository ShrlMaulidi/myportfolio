<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuestbookMessage extends Model
{
    protected function casts(): array
    {
        return [
            'reactions' => 'array',
        ];
    }
}

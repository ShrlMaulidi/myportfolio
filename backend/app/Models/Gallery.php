<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected function casts(): array
    {
        return [
            'reactions' => 'array',
        ];
    }
}

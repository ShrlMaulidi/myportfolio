<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected function casts(): array
    {
        return [
            'tech' => 'array',
            'images' => 'array',
            'reactions' => 'array',
        ];
    }
}

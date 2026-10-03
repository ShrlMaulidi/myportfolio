<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected function casts(): array
    {
        return [
            'responsibilities' => 'array',
            'responsibilitiesEn' => 'array',
        ];
    }
}

<?php

namespace App\Filament\Resources\GuestbookMessageResource\Pages;

use App\Filament\Resources\GuestbookMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateGuestbookMessage extends CreateRecord
{
    protected static string $resource = GuestbookMessageResource::class;
}

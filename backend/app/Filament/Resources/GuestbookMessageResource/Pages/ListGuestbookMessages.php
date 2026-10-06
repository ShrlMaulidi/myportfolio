<?php

namespace App\Filament\Resources\GuestbookMessageResource\Pages;

use App\Filament\Resources\GuestbookMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListGuestbookMessages extends ListRecords
{
    protected static string $resource = GuestbookMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

<?php

namespace App\Filament\Resources\GuestbookMessageResource\Pages;

use App\Filament\Resources\GuestbookMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGuestbookMessage extends EditRecord
{
    protected static string $resource = GuestbookMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

<?php

namespace App\Filament\Resources\TopLanguageResource\Pages;

use App\Filament\Resources\TopLanguageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTopLanguages extends ListRecords
{
    protected static string $resource = TopLanguageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

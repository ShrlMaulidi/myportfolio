<?php

namespace App\Filament\Resources\DashboardStatResource\Pages;

use App\Filament\Resources\DashboardStatResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDashboardStats extends ListRecords
{
    protected static string $resource = DashboardStatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

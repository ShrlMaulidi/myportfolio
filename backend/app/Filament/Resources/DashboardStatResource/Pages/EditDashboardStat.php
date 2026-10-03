<?php

namespace App\Filament\Resources\DashboardStatResource\Pages;

use App\Filament\Resources\DashboardStatResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDashboardStat extends EditRecord
{
    protected static string $resource = DashboardStatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

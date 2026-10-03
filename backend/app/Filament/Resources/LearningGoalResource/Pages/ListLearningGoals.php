<?php

namespace App\Filament\Resources\LearningGoalResource\Pages;

use App\Filament\Resources\LearningGoalResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLearningGoals extends ListRecords
{
    protected static string $resource = LearningGoalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

<?php

namespace App\Filament\Resources\LearningGoalResource\Pages;

use App\Filament\Resources\LearningGoalResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLearningGoal extends EditRecord
{
    protected static string $resource = LearningGoalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

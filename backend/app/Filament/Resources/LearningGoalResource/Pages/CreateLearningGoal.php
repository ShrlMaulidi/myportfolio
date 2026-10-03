<?php

namespace App\Filament\Resources\LearningGoalResource\Pages;

use App\Filament\Resources\LearningGoalResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateLearningGoal extends CreateRecord
{
    protected static string $resource = LearningGoalResource::class;
}

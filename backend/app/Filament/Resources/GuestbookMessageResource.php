<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GuestbookMessageResource\Pages;
use App\Filament\Resources\GuestbookMessageResource\RelationManagers;
use App\Models\GuestbookMessage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class GuestbookMessageResource extends Resource
{
    protected static ?string $model = GuestbookMessage::class;

    protected static ?string $navigationLabel = 'Ruang Diskusi';
    protected static ?string $modelLabel = 'Pesan Diskusi';
    protected static ?string $pluralModelLabel = 'Ruang Diskusi';

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';
    
    protected static ?int $navigationSort = 6; // Place it lower

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('avatar')
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\Textarea::make('message')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('reactions')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('message')
                    ->limit(50)
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGuestbookMessages::route('/'),
            'create' => Pages\CreateGuestbookMessage::route('/create'),
            'edit' => Pages\EditGuestbookMessage::route('/{record}/edit'),
        ];
    }
}

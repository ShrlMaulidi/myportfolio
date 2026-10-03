<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProfileResource\Pages;
use App\Filament\Resources\ProfileResource\RelationManagers;
use App\Models\Profile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProfileResource extends Resource
{
    protected static ?string $model = Profile::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('username')
                    ->required()
                    ->maxLength(255),
                Forms\Components\FileUpload::make('img')->image()
                    ,
                Forms\Components\TextInput::make('status')
                    ->required()
                    ,
                Forms\Components\TextInput::make('statusEn')
                    ,
                Forms\Components\TextInput::make('job')
                    ->required()
                    ,
                Forms\Components\TextInput::make('jobEn')
                    ,
                Forms\Components\Toggle::make('isAvailable')
                    ->required(),
                Forms\Components\TextInput::make('avail_status')
                    ,
                Forms\Components\TextInput::make('avail_statusEn')
                    ,
                Forms\Components\TextInput::make('avail_desc')
                    ,
                Forms\Components\TextInput::make('avail_descEn')
                    ,
                Forms\Components\TextInput::make('avail_link')
                    ,
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('username')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('img')
                    ,
                Tables\Columns\TextColumn::make('status')
                    ,
                Tables\Columns\TextColumn::make('statusEn')
                    ,
                Tables\Columns\TextColumn::make('job')
                    ,
                Tables\Columns\TextColumn::make('jobEn')
                    ,
                Tables\Columns\IconColumn::make('isAvailable')
                    ->boolean(),
                Tables\Columns\TextColumn::make('avail_status')
                    ,
                Tables\Columns\TextColumn::make('avail_statusEn')
                    ,
                Tables\Columns\TextColumn::make('avail_desc')
                    ,
                Tables\Columns\TextColumn::make('avail_descEn')
                    ,
                Tables\Columns\TextColumn::make('avail_link')
                    ,
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListProfiles::route('/'),
            'create' => Pages\CreateProfile::route('/create'),
            'edit' => Pages\EditProfile::route('/{record}/edit'),
        ];
    }
}

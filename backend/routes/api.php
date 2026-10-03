<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/guestbook', [App\Http\Controllers\GuestbookMessageController::class, 'index']);
Route::post('/guestbook', [App\Http\Controllers\GuestbookMessageController::class, 'store']);
Route::post('/guestbook/{id}/react', [App\Http\Controllers\GuestbookMessageController::class, 'react']);
Route::post('/{type}/{id}/react', [App\Http\Controllers\ReactionController::class, 'toggle'])->whereIn('type', ['project', 'gallery']);

Route::get('/projects', function () {
    return response()->json(\App\Models\Project::all());
});

Route::get('/skills', function () {
    return response()->json(\App\Models\Skill::all());
});

Route::get('/achievements', function () {
    return response()->json(\App\Models\Achievement::all());
});

Route::get('/careers', function () {
    return response()->json(\App\Models\Career::all());
});

Route::get('/galleries', function () {
    return response()->json(\App\Models\Gallery::all());
});

Route::get('/profiles', function () {
    return response()->json(\App\Models\Profile::first());
});

Route::get('/education', function () {
    return response()->json(\App\Models\Education::all());
});

Route::get('/social-media', function () {
    return response()->json(\App\Models\SocialMedia::all());
});

Route::get('/dashboard-stats', function () {
    return response()->json(\App\Models\DashboardStat::all());
});

Route::get('/top-languages', function () {
    return response()->json(\App\Models\TopLanguage::all());
});

Route::get('/tools', function () {
    return response()->json(\App\Models\Tool::all());
});

Route::get('/learning-goals', function () {
    return response()->json(\App\Models\LearningGoal::all());
});

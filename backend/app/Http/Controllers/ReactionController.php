<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function toggle(Request $request, $type, $id)
    {
        $validated = $request->validate([
            'emoji' => 'required|string',
            'email' => 'required|email',
        ]);

        $modelClass = match($type) {
            'project' => \App\Models\Project::class,
            'gallery' => \App\Models\Gallery::class,
            default => null,
        };

        if (!$modelClass) {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        $model = $modelClass::findOrFail($id);
        $reactions = $model->reactions ?? [];
        $emoji = $validated['emoji'];
        $email = $validated['email'];

        if (!isset($reactions[$emoji])) {
            $reactions[$emoji] = [];
        }

        $userIndex = array_search($email, $reactions[$emoji]);
        if ($userIndex !== false) {
            unset($reactions[$emoji][$userIndex]);
            $reactions[$emoji] = array_values($reactions[$emoji]);
            if (empty($reactions[$emoji])) {
                unset($reactions[$emoji]);
            }
        } else {
            $reactions[$emoji][] = $email;
        }

        $model->reactions = empty($reactions) ? null : $reactions;
        $model->save();

        return response()->json($model);
    }
}

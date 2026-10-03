<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GuestbookMessageController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\GuestbookMessage::orderBy('created_at', 'asc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'avatar' => 'nullable|string',
            'message' => 'required|string',
        ]);

        $message = \App\Models\GuestbookMessage::create($validated);
        return response()->json($message, 201);
    }

    public function react(Request $request, $id)
    {
        $validated = $request->validate([
            'emoji' => 'required|string',
            'email' => 'required|email',
        ]);

        $message = \App\Models\GuestbookMessage::findOrFail($id);
        $reactions = $message->reactions ?? [];
        $emoji = $validated['emoji'];
        $email = $validated['email'];

        if (!isset($reactions[$emoji])) {
            $reactions[$emoji] = [];
        }

        $userIndex = array_search($email, $reactions[$emoji]);
        if ($userIndex !== false) {
            unset($reactions[$emoji][$userIndex]);
            $reactions[$emoji] = array_values($reactions[$emoji]); // reindex
            if (empty($reactions[$emoji])) {
                unset($reactions[$emoji]);
            }
        } else {
            $reactions[$emoji][] = $email;
        }

        $message->reactions = empty($reactions) ? null : $reactions;
        $message->save();

        return response()->json($message);
    }
}

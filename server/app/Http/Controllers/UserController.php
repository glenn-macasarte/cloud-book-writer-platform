<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function collaborators()
    {
        $collaborators = User::where('role', '!=', 1)->get();
        return response()->json([
            'message' => 'Collaborators list.',
            'collaborators' => $collaborators
        ], 200);
    }

    public function updateRole(User $user, $role)
    {
        $user->update([
            'role' => $role
        ]);

        return response()->json([
            'message' => 'Collaborators successfully updated.'
        ], 200);
    }
}
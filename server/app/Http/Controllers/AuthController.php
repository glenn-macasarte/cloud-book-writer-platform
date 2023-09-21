<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        // validate the request data
        $credentials = $request->validated();

        // get user for that emailcredentials
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Credentials invalid.'
            ], 422);
        }

        $user = User::where('email', $credentials['email'])->first();
        $authToken = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Successfully logged in.',
            'user' => $user,
            'token' => $authToken
        ], 200);
    }
}
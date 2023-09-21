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
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
        }

        // check if users exists and if password matched
        // if (!$user || !Hash::check($data['password'], $user->password)) {
        //     return response()->json([
        //         'message' => 'Email or password is incorrect!'
        //     ], 401);
        // }

        // $token = $user->createToken('auth_token')->plainTextToken;
        // $cookie = cookie('token', $token, 60 * 24); // 1 day

        // return response()->json([
        //     $user
        // ], 200)->withCookie($cookie);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        return Inertia::render("auth/login");
    }

    public function register(Request $request)
    {
        return Inertia::render("auth/register");
    }

    public function registerRequest(Request $request)
    {
        $request->validate([
            "email" => "required|email|unique:users,email",
            "fullname" => "required|string",
            "password" => "required|min:8|string",
            "retry_password" => "required|min:8|same:password|string"
        ]);

        User::create([
            "name" => $request->fullname,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);

        return redirect()->route("login");
    }

    function loginRequest(Request $request)
    {
        $request->validate([
            "email" => "required|email|exists:users,email",
            "password" => "required|min:8|string",
        ]);

        $user = User::where("email", $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            Auth::login($user);
            return redirect()->route("dashboard");
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    function logout(Request $request)
    {
        Auth::logout();
        return redirect()->route("login");
    }

    function dashboard()
    {
        return Inertia::render("modules/dashboard");
    }
}

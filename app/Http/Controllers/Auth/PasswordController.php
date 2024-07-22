<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request, int $id): RedirectResponse
    {

        $user = User::findOrFail($id);

        if (!$request->user()->isAdmin()) {
            $request->validate([
                'password' => 'required|string'
            ]);

            if (!\Hash::check($request->input('password'), $user->password)) {
                return redirect()->back()->with('error', 'The password you entered is incorrect.');
            }
        }

        $request->user()->update([
            'password' => Hash::make($request->input('password')),
        ]);

        return back();
    }
}

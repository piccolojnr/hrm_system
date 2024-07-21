<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Department;
use App\Models\Role;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $roles = Role::all();
        $departments = Department::all();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'roles' => $roles,
            'departments' => $departments
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $request->user()->fill($data);

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            if ($request->has('roles')) {
                $roleIds = [];
                foreach ($data['roles'] as $roleSlug) {
                    $role = Role::where('slug', $roleSlug)->firstOrFail();
                    $roleIds[] = $role->id;
                }
                $request->user()->roles()->sync($roleIds);
            }

            $request->user()->save();
            $request->session()->flash('success', 'Profile updated successfully!');
            return Redirect::route('profile.edit');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

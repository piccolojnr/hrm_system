<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Department;
use App\Models\Role;
use App\Models\User;
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

        return Inertia::render('Profile/edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'roles' => $roles,
            'departments' => $departments
        ]);
    }

    /**
     * Update the user's Profile information.
     */
    public function update(ProfileUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $user = User::findOrFail($id);

            $data = $request->validated();

            $user->fill($data);

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }
            if ($request->has('roles')) {
                $roleIds = [];
                foreach ($data['roles'] as $roleSlug) {
                    $role = Role::where('slug', $roleSlug)->firstOrFail();
                    $roleIds[] = $role->id;
                }
                $user->roles()->sync($roleIds);
            }

            $user->save();

            $request->session()->flash('success', 'Profile updated successfully!');
            return Redirect::route('profile.edit', $user->id);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, int $id): RedirectResponse
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
        $user->delete();

        $request->session()->flash('success', 'Account deleted successfully!');
        // redirect back 2 times to go back to the welcome page
        return Redirect::route('employees.index');
    }
}

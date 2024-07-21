<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        // get roles
        $roles = Role::all();
        $departments = Department::all();

        return Inertia::render(
            'Auth/Register',
            [
                'roles' => $roles,
                'departments' => $departments
            ]
        );
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $data = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'username' => ['required', 'string', 'alpha_dash', 'max:255', 'unique:users'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users'],
                'roles' => ['required', 'array', 'min:1'],
                'roles.*' => ['required', 'string', 'max:255', 'exists:roles,slug'],
                'department' => ['required', 'string', 'max:255', 'exists:departments,slug'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            $roles = [];
            foreach ($data['roles'] as $role) {
                $roles[] = Role::where('slug', $role)->firstOrFail();
            }
            $department = Department::where('slug', $request->department)->firstOrFail();

            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            foreach ($roles as $role) {
                UserRole::create([
                    'user_id' => $user->id,
                    'role_id' => $role->id,
                ]);
            }

            Employee::create([
                'user_id' => $user->id,
                'department_id' => $department->id,
            ]);

            event(new Registered($user));

            Auth::login($user);

            $request->session()->flash('success', 'Registration successful and you are now logged in.');
            return redirect(route('profile.edit', absolute: false));
        } catch (\Exception $e) {
            $request->session()->flash('error', $e->getMessage());
            return redirect(route('register', ));
        }
    }
}

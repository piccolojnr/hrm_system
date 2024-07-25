<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeUpdateRequest;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {


        $filter = $request->query('user_name', '');
        $user = $request->user();

        $pagination = Employee::whereHas('user', function ($query) use ($filter) { // phpcs:ignore
            $query->where('name', 'like', "%{$filter}%");
        })
            ->when($user->hasRole('department_manager'), function ($query) use ($user) {
                $query->where('department_id', $user->employee->department_id);
            })
            ->with('user', 'department')
            ->paginate(10)
            ->withQueryString();

        \Gate::authorize('viewAny', User::class);

        return Inertia::render("Employees/index", [
            "pagination" => $pagination,
            "filter" => $filter,
        ]);
    }

    public function show(int $id)
    {
        $user = User::where('id', $id);
        \Gate::authorize('view', $user->first());

        $roles = Role::all()->reject(function ($role) {
            return $role->slug === 'admin';
        })->values();


        $departments = Department::all();
        return Inertia::render("Employees/show", [
            'user' => $user->with('employee', "roles")->with("employee.department")->first(),
            'roles' => $roles,
            'departments' => $departments
        ]);
    }



    public function create()
    {
        $roles = Role::all()->reject(function ($role) {
            return $role->slug === 'admin';
        })->values();
        $departments = Department::all();

        return Inertia::render("Employees/create", [
            'roles' => $roles,
            'departments' => $departments
        ]);
    }

    public function update(EmployeeUpdateRequest $request, int $id)
    {
        try {
            $user = User::findOrFail($id);

            \Gate::authorize('update', $user);

            $data = $request->validated();

            if ($request->has('department')) {
                $department = Department::where('slug', $request->department)->firstOrFail();
                $data['department_id'] = $department->id;
            }

            $user->employee->update($data);
            $request->session()->flash('success', 'Employee updated.');
            return back()->with('success', 'Employee updated.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function updatePhoto(Request $request, int $id)
    {
        $user = User::findOrFail($id);
        \Gate::authorize('update', $user);

        $request->validate([
            'photo' => ['required', 'image', 'max:1024'],
        ]);

        try {

            $filepath = public_path('photos');

            if ($request->hasFile('photo')) {
                // Delete existing photo if it exists
                if ($user->employee->photo) {
                    $existingPhotoPath = $filepath . '/' . $user->employee->photo;
                    if (\File::exists($existingPhotoPath)) {
                        \File::delete($existingPhotoPath);
                    }
                }

                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();

                $photo->move($filepath, $filename);
                $user->employee->update(['photo' => $filename]);
                $request->session()->flash('success', 'Photo updated.');

            } else {
                $photo = null;

                $request->session()->flash('error', 'Photo not updated.');
            }

            return back();
        } catch (\Exception $e) {
            // Flash error message to the session and redirect back with error message
            return back()->with('error', $e->getMessage());
        }
    }


}

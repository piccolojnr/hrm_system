<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeUpdateRequest;
use App\Models\Department;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return view('employees.index');
    }

    public function update(EmployeeUpdateRequest $request)
    {
        try {
            $data = $request->validated();

            if ($request->has('department')) {
                $department = Department::where('slug', $request->department)->firstOrFail();
                $data['department_id'] = $department->id;
            }

            $request->user()->employee->update($data);
            $request->session()->flash('success', 'Employee updated.');
            return back()->with('success', 'Employee updated.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => ['required', 'image', 'max:1024'],
        ]);

        try {

            $filepath = public_path('photos');

            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $filename = time() . '.' . $photo->getClientOriginalExtension();

                $photo->move($filepath, $filename);
                $request->user()->employee->update(['photo' => $filename]);
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

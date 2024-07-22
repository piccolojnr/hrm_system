<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->query('name', '');

        $pagination = Department::where('name', 'like', "%{$filter}%")
            ->with('head')
            ->paginate(10);

        // add filter to pagination links
        $pagination->appends(['name' => $filter]);

        return inertia('Departments/index', [
            'pagination' => $pagination,
        ]);
    }

    public function show(int $id)
    {
        $department = Department::where('id', $id)->with('head')->first();

        return inertia('Departments/show', [
            'department' => $department,
        ]);
    }

    public function create(Request $request)
    {
        return inertia('Departments/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'head' => 'required|exists:users,username',
        ]);

        try {
            $head_id = User::where('username', $request->input('head'))->first()->id;

            if ($head_id === null) {
                return redirect()->back()->with('error', 'Head not found.');
            }

            $department = new Department();
            $department->name = $request->input('name');
            $department->slug = \Str::slug($request->input('name'));
            $department->description = $request->input('description');
            $department->head_id = $head_id;

            $department->save();

            return redirect()->route('departments.index')->with('success', 'Department created.');
        } catch (\Exception $e) {
            dd($e);
            return redirect()->back()->with('error', 'Error creating department.');
        }
    }

    public function update(int $id, Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'head' => 'required|exists:users,username',
        ]);

        try {
            $department = Department::findOrFail($id);

            $head_id = User::where('username', $request->input('head'))->first()->id;

            if ($head_id === null) {
                return redirect()->back()->with('error', 'Head not found.');
            }

            $department->name = $request->input('name');
            $department->slug = \Str::slug($request->input('name'));
            $department->description = $request->input('description');
            $department->head_id = $head_id;

            $department->save();

            return redirect()->back()->with('success', 'Department updated.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error updating department.');
        }
    }

    public function destroy(int $id)
    {
        try {
            $department = Department::findOrFail($id);
            $department->delete();

            return redirect()->route("departments.index")->with('success', 'Department deleted.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error deleting department.');
        }
    }
}

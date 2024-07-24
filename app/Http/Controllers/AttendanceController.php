<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->query('user_id');
        $user = User::findOrFail($user_id);
        $name = $request->query('user_name');
        $day = $request->query('day');
        $pagination = Attendance::where('user_id', $user_id)
            ->whereHas('user', function ($query) use ($name) { // phpcs:ignore
                $query->where('name', 'like', "%{$name}%");
            })
            ->when($day, function ($query, $day) {
                $query->whereDate('date', $day);
            })
            ->with('user')
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Attendances/index', [
            'pagination' => $pagination,
            'user' => $user,
        ]);
    }

    public function userAttendances(Request $request)
    {
        $day = $request->query('day');
        $pagination = Attendance::where('user_id', auth()->id())
            ->when($day, function ($query, $day) {
                $query->whereDate('date', $day);
            })
            ->with('user')
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();
        return Inertia::render(
            'Attendances/user'
            ,
            [
                'pagination' => $pagination,
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Attendances/create');
    }

    public function show(Attendance $attendance)
    {
        return Inertia::render('Attendances/show', [
            'attendance' => $attendance->load('user'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "type" => ['required', 'string', 'max:255'],
            "username" => ['required', 'string', 'max:255', 'exists:users,username'],
            "date" => ['required', 'date'],
            "check_in" => ['nullable', 'date_format:H:i'],
            "check_out" => ['nullable', 'date_format:H:i'],
        ]);


        $user = User::where('username', $request->username)->first();

        $attendance = new Attendance();
        $attendance->type = $request->type;
        $attendance->user_id = $user->id;
        $attendance->date = $request->date;
        $attendance->check_in = $request->check_in;
        $attendance->check_out = $request->check_out;

        $attendance->save();

        $request->session()->flash('message', 'Attendance created successfully.');
        return redirect()->route(
            'attendances.user',
            $user->id,
        );
    }


    public function update(Request $request, int $id)
    {
        try {
            $request->validate([
                'type' => 'required',
                'user_id' => 'required',
                'date' => 'required',
                'check_in' => 'required',
                'check_out' => 'required',
            ]);

            $user = User::findOrFail($request->user_id);
            $attendance = Attendance::findOrFail($id);
            $attendance->type = $request->type;
            $attendance->user_id = $user->id;
            $attendance->date = $request->date;
            $attendance->check_in = $request->check_in;
            $attendance->check_out = $request->check_out;

            $attendance->save();

            return redirect()->back()->with('success', 'Attendance updated successfully');
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the attendance');
        }
    }

    public function destroy(int $id)
    {
        try {
            $attendance = Attendance::findOrFail($id);
            $attendance->delete();
            return redirect()->back()->with('success', 'Attendance deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while deleting the attendance');
        }
    }
}

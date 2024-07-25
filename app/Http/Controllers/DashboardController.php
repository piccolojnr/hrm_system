<?php

namespace App\Http\Controllers;

use App\Mail\QuickEmail;
use App\Models\Attendance;
use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $totalEmployees = Employee::when($user->hasRole('department_manager'), function ($query) use ($user) {
            $query->where('department_id', $user->employee->department_id);
        })
            ->count();
        $totalDepartments = Department::count();
        $recentAttendance = Attendance::with('user')
            ->when($user->hasRole('department_manager'), function ($query) use ($user) {
                $query->whereHas('user', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                });
            })->orderBy('date', 'desc')->take(5)->get();

        return Inertia::render('Dashboard', [
            'user' => $user,
            'statistics' => [
                'totalEmployees' => $totalEmployees,
                'totalDepartments' => $totalDepartments,
                'recentAttendance' => $recentAttendance,
            ],
        ]);
    }

    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $email = $request->input('email');
        $subject = $request->input('subject');
        $messageContent = $request->input('message');

        \Mail::to($email)->send(new QuickEmail($subject, $messageContent, $request->user()));

        return redirect()->back()->with('success', 'Email sent successfully.');
    }
}

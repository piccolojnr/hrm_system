<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrainingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['guest'])->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/{id}', [ProfileController::class, 'update'])->where('id', '[0-9]+')->name('profile.update');
    Route::delete('/profile/{id}', [ProfileController::class, 'destroy'])->where('id', '[0-9]+')->name('profile.destroy');


    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/employees/{id}/show', [EmployeeController::class, 'show'])->where('id', '[0-9]+')->name('employees.show');


    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees/create', [EmployeeController::class, 'store'])->name('employees.create');


    Route::patch('/employee/{id}', [EmployeeController::class, 'update'])->where('id', '[0-9]+')->name('employee.update');
    Route::post('/employee/update-photo/{id}', [EmployeeController::class, 'updatePhoto'])->where('id', '[0-9]+')->name('employee.update.photo');

    Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
    Route::get('/departments/create', [DepartmentController::class, 'create'])->name('departments.create');
    Route::post('/departments/create', [DepartmentController::class, 'store'])->name('departments.create');
    Route::get('/departments/{id}/show', [DepartmentController::class, 'show'])->where('id', '[0-9]+')->name('departments.show');
    Route::patch('/departments/{id}/update', [DepartmentController::class, 'update'])->where('id', '[0-9]+')->name('departments.update');
    Route::delete('/departmetns/{id}', [DepartmentController::class, 'destroy'])->where('id', '[0-9]+')->name('departments.destroy');

    // attendance
    Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendances.index');
    Route::get('/attendances/users/{id}', [AttendanceController::class, 'userAttendances'])->where('id', '[0-9]+')->name('attendances.user');
    Route::get('/attendances/create', [AttendanceController::class, 'create'])->name('attendances.create');
    Route::post('/attendances/create', [AttendanceController::class, 'store'])->name('attendances.create');
    Route::patch('/attendances/{id}/update', [AttendanceController::class, 'update'])->where('id', '[0-9]+')->name('attendances.update');
    Route::delete('/attendances/{id}', [AttendanceController::class, 'destroy'])->where('id', '[0-9]+')->name('attendances.destroy');

    // trainings
    Route::get('/trainings', [TrainingsController::class, 'index'])->name('trainings.index');
    Route::get('/trainings/{id}', [TrainingsController::class, 'show'])->where('id', '[0-9]+')->name('trainings.show');
    Route::patch('/trainings/{id}', [TrainingsController::class, 'update'])->where('id', '[0-9]+')->name('trainings.update');
    Route::delete('/trainings/{id}', [TrainingsController::class, 'destroy'])->where('id', '[0-9]+')->name('trainings.destroy');
    Route::get('/trainings/create', [TrainingsController::class, 'create'])->name('trainings.create');
    Route::post('/trainings/create', [TrainingsController::class, 'store'])->name('trainings.create');

    // evaluations
    Route::get('/evaluations', [EvaluationController::class, 'index'])->name('evaluations.index');
    Route::get('/evaluations/create', [EvaluationController::class, 'create'])->name('evaluations.create');
    Route::post('/evaluations/create', [EvaluationController::class, 'store'])->name('evaluations.create');
    Route::get('/evaluations/{id}', [EvaluationController::class, 'show'])->where('id', '[0-9]+')->name('evaluations.show');
    Route::patch('/evaluations/{id}', [EvaluationController::class, 'update'])->where('id', '[0-9]+')->name('evaluations.update');
    Route::delete('/evaluations/{id}', [EvaluationController::class, 'destroy'])->where('id', '[0-9]+')->name('evaluations.destroy');
});

require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
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
    Route::patch('/profile/{id}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{id}', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/employees/{id}/show', [EmployeeController::class, 'show'])->name('employees.show');


    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees/create', [EmployeeController::class, 'store'])->name('employees.create');


    Route::patch('/employee/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::post('/employee/update-photo/{id}', [EmployeeController::class, 'updatePhoto'])->name('employee.update.photo');

    Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
    Route::get('/departments/create', [DepartmentController::class, 'create'])->name('departments.create');
    Route::post('/departments/create', [DepartmentController::class, 'store'])->name('departments.create');
    Route::get('/departments/{id}/show', [DepartmentController::class, 'show'])->name('departments.show');
    Route::patch('/departments/{id}/update', [DepartmentController::class, 'update'])->name('departments.update');
    Route::delete('/departmetns/{id}', [DepartmentController::class, 'destroy'])->name('departments.destroy');

});

require __DIR__ . '/auth.php';

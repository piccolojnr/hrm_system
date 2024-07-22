<?php

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


    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees');
    Route::get('/employees/{id}/show', [EmployeeController::class, 'show'])->name('employees.show');


    Route::get('/employees/new', [EmployeeController::class, 'create'])->name('employees.new');
    Route::post('/employees/new', [EmployeeController::class, 'store'])->name('employees.create');


    Route::patch('/employee/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::post('/employee/update-photo/{id}', [EmployeeController::class, 'updatePhoto'])->name('employee.update.photo');

});

require __DIR__ . '/auth.php';

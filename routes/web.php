<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\TrainingsController;
use App\Http\Controllers\VacationController;
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
    Route::patch('/profile/{id}/update', [ProfileController::class, 'update'])->where('id', '[0-9]+')->name('profile.update');
    Route::delete('/profile/{id}/destroy', [ProfileController::class, 'destroy'])->where('id', '[0-9]+')->name('profile.destroy');

    Route::middleware('role:admin,hr_manager')->group(function () {



        Route::get('/employees/create', [EmployeeController::class, 'create'])->name('employees.create');
        Route::post('/employees/create', [EmployeeController::class, 'store'])->name('employees.create');




        Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
        Route::get('/departments/create', [DepartmentController::class, 'create'])->name('departments.create');
        Route::post('/departments/create', [DepartmentController::class, 'store'])->name('departments.create');
        Route::get('/departments/{id}/show', [DepartmentController::class, 'show'])->where('id', '[0-9]+')->name('departments.show');
        Route::patch('/departments/{id}/update', [DepartmentController::class, 'update'])->where('id', '[0-9]+')->name('departments.update');
        Route::delete('/departments/{id}/delete', [DepartmentController::class, 'destroy'])->where('id', '[0-9]+')->name('departments.destroy');
    });

    Route::middleware('role:admin,hr_manager,employee')->group(function () {
        // attendance

        Route::get('/profile/attendances', [AttendanceController::class, 'userAttendances'])->name('profile.attendances');
        Route::get('/profile/trainings', [TrainingsController::class, 'userTrainings'])->name('profile.trainings');
        Route::get('/profile/evaluations', [EvaluationController::class, 'userEvaluations'])->name('profile.evaluations');
        Route::get('/profile/salaries', [SalaryController::class, 'userSalaries'])->name('profile.salaries');
        Route::get('/profile/salary-slip', [SalaryController::class, 'salarySlip'])->name('profile.salaries.slip');
        Route::get('/profile/vacations', [VacationController::class, 'userVacations'])->name('profile.vacations');

        Route::get('/vacations/create', [VacationController::class, 'create'])->name('vacations.create');
        Route::post('/vacations/create', [VacationController::class, 'store'])->name('vacations.create');

    });

    Route::middleware('role:admin,hr_manager,department_manager')->group(function () {
        Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
        Route::get('/employees/{id}/show', [EmployeeController::class, 'show'])->where('id', '[0-9]+')->name('employees.show');
        Route::patch('/employee/{id}/update', [EmployeeController::class, 'update'])->where('id', '[0-9]+')->name('employee.update');
        Route::post('/employee/{id}/update-photo', [EmployeeController::class, 'updatePhoto'])->where('id', '[0-9]+')->name('employee.update.photo');


        Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendances.index');

        Route::get('/attendances/create', [AttendanceController::class, 'create'])->name('attendances.create');
        Route::post('/attendances/create', [AttendanceController::class, 'store'])->name('attendances.create');
        Route::patch('/attendances/{id}/update', [AttendanceController::class, 'update'])->where('id', '[0-9]+')->name('attendances.update');
        Route::delete('/attendances/{id}/delete', [AttendanceController::class, 'destroy'])->where('id', '[0-9]+')->name('attendances.destroy');
        // trainings
        Route::get('/trainings', [TrainingsController::class, 'index'])->name('trainings.index');
        Route::get('/trainings/{id}/show', [TrainingsController::class, 'show'])->where('id', '[0-9]+')->name('trainings.show');
        Route::patch('/trainings/{id}/update', [TrainingsController::class, 'update'])->where('id', '[0-9]+')->name('trainings.update');
        Route::delete('/trainings/{id}/delete', [TrainingsController::class, 'destroy'])->where('id', '[0-9]+')->name('trainings.destroy');
        Route::get('/trainings/create', [TrainingsController::class, 'create'])->name('trainings.create');
        Route::post('/trainings/create', [TrainingsController::class, 'store'])->name('trainings.create');

        // endroll user to training
        Route::post('/trainings/{id}/enroll', [TrainingsController::class, 'enroll'])->where('id', '[0-9]+')->name('trainings.enroll');
        Route::delete('/trainings/{training_id}/enroll/{user_id}', [TrainingsController::class, 'unenroll'])->where('training_id', '[0-9]+')->where('user_id', '[0-9]+')->name('trainings.unenroll');


        // evaluations
        Route::get('/evaluations', [EvaluationController::class, 'index'])->name('evaluations.index');
        Route::get('/evaluations/create', [EvaluationController::class, 'create'])->name('evaluations.create');
        Route::post('/evaluations/create', [EvaluationController::class, 'store'])->name('evaluations.create');
        Route::get('/evaluations/{id}/show', [EvaluationController::class, 'show'])->where('id', '[0-9]+')->name('evaluations.show');
        Route::patch('/evaluations/{id}/update', [EvaluationController::class, 'update'])->where('id', '[0-9]+')->name('evaluations.update');
        Route::delete('/evaluations/{id}/delete', [EvaluationController::class, 'destroy'])->where('id', '[0-9]+')->name('evaluations.destroy');


        // salaries
        Route::get('/salaries', [SalaryController::class, 'index'])->name('salaries.index');
        Route::get('/salaries/create', [SalaryController::class, 'create'])->name('salaries.create');
        Route::get('/salaries/{id}', [SalaryController::class, 'show'])->where('id', '[0-9]+')->name('salaries.show');
        Route::post('/salaries/create', [SalaryController::class, 'store'])->name('salaries.create');
        Route::patch('/salaries/{id}', [SalaryController::class, 'update'])->where('id', '[0-9]+')->name('salaries.update');
        Route::delete('/salaries/{id}', [SalaryController::class, 'destroy'])->where('id', '[0-9]+')->name('salaries.destroy');

        // vacations
        Route::get('/vacations', [VacationController::class, 'index'])->name('vacations.index');

        Route::get('/vacations/{id}/show', [VacationController::class, 'show'])->where('id', '[0-9]+')->name('vacations.show');
        Route::patch('/vacations/{id}/show', [VacationController::class, 'update'])->where('id', '[0-9]+')->name('vacations.update');
        Route::delete('/vacations/{id}/delete', [VacationController::class, 'destroy'])->where('id', '[0-9]+')->name('vacations.destroy');
        Route::post('/vacations/approve/{id}', [VacationController::class, 'approve'])->where('id', '[0-9]+')->name('vacations.approve');
        Route::post('/vacations/reject/{id}', [VacationController::class, 'reject'])->where('id', '[0-9]+')->name('vacations.reject');

    });
});

require __DIR__ . '/auth.php';

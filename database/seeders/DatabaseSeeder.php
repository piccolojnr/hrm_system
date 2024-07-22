<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Role;
use App\Models\UserRole;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{


    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = [
            'Admin' => 'admin',
            'HR Manager' => 'hr_manager',
            'Department Manager' => 'department_manager',
            'Employee' => 'employee',
        ];

        $roleInstances = [];
        foreach ($roles as $name => $slug) {
            $roleInstances[$slug] = Role::factory()->create([
                'name' => $name,
                'slug' => $slug,
                'description' => $name,
            ]);
        }

        $departments = [
            'human_resources' => 'Human Resources Department',
            'finance' => 'Finance Department',
            'it' => 'IT Department',
        ];

        $departmentInstances = [];
        foreach ($departments as $name => $slug) {
            $departmentInstances[$name] = Department::factory()->create([
                'name' => $slug,
                'slug' => $name,
                'description' => $slug,
            ]);
        }


        $users = [
            [
                'name' => 'John Doe',
                'username' => 'johndoe',
                'email' => 'john.doe@example.com',
                'role' => 'admin',
                'address' => '123 Main St',
                'mobile' => '555-555-5555',
                'birth_date' => '1990-01-01',
                'hire_date' => '2024-07-19',
                'photo' => null,
                'department' => 'human_resources',
            ],
            [
                'name' => 'Jane Smith',
                'username' => 'janesmith',
                'email' => 'jane.smith@example.com',
                'role' => 'hr_manager',
                'address' => '456 Elm St',
                'mobile' => '555-555-5555',
                'birth_date' => '1990-01-01',
                'hire_date' => '2024-07-19',
                'photo' => null,
                'department' => 'finance',

            ],
            [
                'name' => 'Emily Johnson',
                'username' => 'emilyjohnson',
                'email' => 'emily.johnson@example.com',
                'role' => 'department_manager',
                'address' => '789 Oak St',
                'mobile' => '555-555-5555',
                'birth_date' => '1990-01-01',
                'hire_date' => '2024-07-19',
                'photo' => null,
                'department' => 'it',
            ],
            [
                'name' => 'Michael Brown',
                'username' => 'michaelbrown',
                'email' => 'michael.brown@example.com',
                'role' => 'employee',
                'address' => '123 Main St',
                'mobile' => '555-555-5555',
                'birth_date' => '1990-01-01',
                'hire_date' => '2024-07-19',
                'photo' => null,
                'department' => 'human_resources',
            ],
            [
                'name' => 'Sarah Wilson',
                'username' => 'sarahwilson',
                'email' => 'sarah.wilson@example.com',
                'role' => 'employee',
                'address' => '456 Elm St',
                'mobile' => '555-555-5555',
                'birth_date' => '1990-01-01',
                'hire_date' => '2024-07-19',
                'photo' => null,
                'department' => 'finance',
            ],
        ];
        foreach ($users as $userData) {
            $user = User::factory()->create([
                'name' => $userData['name'],
                'username' => $userData['username'],
                'email' => $userData['email'],
                'password' => 'hummer64',
            ]);

            UserRole::factory()->create([
                'user_id' => $user->id,
                'role_id' => $roleInstances[$userData['role']]->id,
            ]);

            Employee::factory()->create([
                'user_id' => $user->id,
                'address' => $userData['address'],
                'mobile' => $userData['mobile'],
                'birth_date' => $userData['birth_date'],
                'hire_date' => $userData['hire_date'],
                'photo' => null,
                null,
            ]);
        }



    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => \App\Models\User::factory(),
            "address" => fake()->sentence(10),
            "mobile" => fake()->phoneNumber,
            "birth_date" => fake()->date,
            "hire_date" => fake()->date,
            "photo" => fake()->word,
            "department_id" => \App\Models\Department::factory(),
        ];
    }
}

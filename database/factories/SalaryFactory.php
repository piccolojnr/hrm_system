<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salary>
 */
class SalaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => \App\Models\User::all()->random()->id,
            "amount" => $this->faker->randomFloat(2, 1000, 10000),
            "bonus" => $this->faker->randomFloat(2, 100, 1000),
        ];
    }
}

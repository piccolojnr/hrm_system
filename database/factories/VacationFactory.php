<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vacation>
 */
class VacationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => User::all()->random()->id,
            "start_date" => $this->faker->date(),
            "end_date" => $this->faker->date(),
            "status" => $this->faker->randomElement(["approved", "rejected", "pending"]),
            "reason" => $this->faker->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trainings>
 */
class TrainingsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->name,
            "type" => $this->faker->word,
            "year" => $this->faker->year,
            "description" => $this->faker->text,
            "user_id" => \App\Models\User::all()->random()->id,
        ];
    }
}

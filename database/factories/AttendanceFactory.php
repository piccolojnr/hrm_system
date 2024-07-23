<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "type" => $this->faker->randomElement(["work", "meeting"]),
            "date" => $this->faker->date(),
            "check_in" => $this->faker->time(),
            "check_out" => $this->faker->randomElement([$this->faker->time(), null]),
            "user_id" => \App\Models\User::all()->random()->id,
        ];
    }
}

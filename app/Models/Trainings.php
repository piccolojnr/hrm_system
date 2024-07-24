<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainings extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'type', 'year', 'description'];


    public function users()
    {
        return $this->belongsToMany(User::class, 'user_trainings', 'training_id', 'user_id');
    }

    public function hasUser(User $user)
    {
        return $this->users->contains($user);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTraining extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'training_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

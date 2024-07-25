<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param \App\Models\User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hr_manager') || $user->hasRole('department_manager');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return $user->hasRole('admin')
            || $user->hasRole('hr_manager')
            || ($user->hasRole('employee') && $user->id === $model->id)
            || ($user->hasRole('department_manager') && $user->employee->department_id === $model->employee->department_id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hr_manager');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        return $user->hasRole('admin')
            || $user->hasRole('hr_manager')
            || ($user->hasRole('employee') && $user->id === $model->id)
            || ($user->hasRole('department_manager') && $user->employee->department_id === $model->employee->department_id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        return $user->hasRole('admin') || $user->hasRole('hr_manager');
    }
}

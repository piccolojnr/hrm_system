<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authosrized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->has('department') && !$this->user()->isAdmin()) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'address' => [
                'nullable',
                'string',
                'max:255'
            ],
            'birth_date' => [
                'nullable',
                'date',
                'before:today'
            ],
            'hire_date' => [
                'nullable',
                'date',
                'before:today'
            ],
            'department_id' => [
                'nullable',
                'integer',
                'exists:departments,id'
            ],
            'mobile' => [
                'nullable',
                'string',
                'max:255'
            ],
        ];
    }
}

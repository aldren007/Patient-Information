<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'prefix' => 'nullable|string|max:20',
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'suffix' => 'nullable|string',
            'sex' => 'required|in:Male,Female,other',
            'birth_date' => 'required|date|date_format:Y-m-d',
            'birth_place' => 'nullable|string|max:255',
            'civil_status' => 'nullable|string|max:50',
            'educ_attainment' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:255',
            'indigenous' => 'nullable|string|max:255',
            'blood_type' => 'nullable|string|max:5',
            'phic_no' => 'required|string|unique:patients,phic_no|max:50',
        ];
    }
}

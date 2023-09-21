<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SectionRequest extends FormRequest
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
        if (request()->isMethod('POST')) {
            $rules = [
                'title'         => ['required'],
                'description'   => ['required'],
                'book_id'       => ['required'],
                'parent_id'     => ['required'],
                'created_by'    => ['required'],
            ];
        } elseif (request()->isMethod('PUT')) {
            $rules = [
                'title'         => ['required'],
                'description'   => ['required'],
                'book_id'       => ['required'],
                'parent_id'     => ['required'],
                'updated_by'    => ['required'],
            ];
        }

        return $rules;
    }
}

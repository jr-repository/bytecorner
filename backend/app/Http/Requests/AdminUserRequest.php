<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class AdminUserRequest extends BaseApiRequest
{
    public function rules(): array
    {
        $id = $this->route('adminUser')?->id ?? $this->attributes->get('AdminUser')?->id;

        return [
            'name' => ['required', 'string', 'max:160'],
            'email' => ['required', 'email', 'max:190', Rule::unique('AdminUsers', 'email')->ignore($id)],
            'password' => [$id ? 'nullable' : 'required', 'string', 'min:6'],
            'role' => ['required', Rule::in(['Super Admin', 'Editor', 'Author'])],
            'avatar' => ['nullable'],
            'profile_photo' => ['nullable'],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
        ];
    }
}

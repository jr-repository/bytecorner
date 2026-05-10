<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUserRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\AdminUserResource;
use App\Models\AdminUser;
use App\Services\ApiResponseService;
use App\Services\UploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $admin = AdminUser::query()
            ->where('email', strtolower($request->validated('email')))
            ->where('status', 'active')
            ->first();

        if (! $admin || ! Hash::check($request->validated('password'), $admin->password)) {
            return ApiResponseService::error('Invalid credentials.', null, 401);
        }

        $plainToken = Str::random(80);
        $admin->tokens()->create([
            'name' => 'react-spa',
            'token_hash' => hash('sha256', $plainToken),
            'expires_at' => now()->addDays(30),
        ]);

        return ApiResponseService::success([
            'token' => $plainToken,
            'user' => new AdminUserResource($admin),
        ], 'Login successful.');
    }

    public function register(AdminUserRequest $request, UploadService $uploads)
    {
        $data = $request->validated();
        $photo = $uploads->imageFromInput($data['avatar'] ?? $data['profile_photo'] ?? null, 'admin-profiles');

        $admin = AdminUser::create([
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'password' => $data['password'],
            'role' => $data['role'] ?? 'Editor',
            'profile_photo' => $photo,
            'status' => $data['status'] ?? 'active',
        ]);

        $plainToken = Str::random(80);
        $admin->tokens()->create([
            'name' => 'react-spa',
            'token_hash' => hash('sha256', $plainToken),
            'expires_at' => now()->addDays(30),
        ]);

        return ApiResponseService::success([
            'token' => $plainToken,
            'user' => new AdminUserResource($admin),
        ], 'Account created.', 201);
    }

    public function profile(Request $request)
    {
        return ApiResponseService::success(new AdminUserResource($request->attributes->get('AdminUser')));
    }

    public function updateProfile(AdminUserRequest $request, UploadService $uploads)
    {
        /** @var AdminUser $admin */
        $admin = $request->attributes->get('AdminUser');
        $data = $request->validated();

        $payload = [
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'role' => $data['role'],
            'status' => $data['status'] ?? $admin->status,
        ];

        if (! empty($data['password'])) {
            $payload['password'] = $data['password'];
        }

        $photo = $uploads->imageFromInput($data['avatar'] ?? $data['profile_photo'] ?? null, 'admin-profiles');
        if ($photo) {
            $payload['profile_photo'] = $photo;
        }

        $admin->update($payload);

        return ApiResponseService::success(new AdminUserResource($admin->fresh()), 'Profile updated.');
    }

    public function updatePhoto(Request $request, UploadService $uploads)
    {
        $request->validate(['image' => ['required']]);
        /** @var AdminUser $admin */
        $admin = $request->attributes->get('AdminUser');
        $admin->update(['profile_photo' => $uploads->imageFromInput($request->input('image'), 'admin-profiles')]);

        return ApiResponseService::success(new AdminUserResource($admin->fresh()), 'Profile photo updated.');
    }

    public function logout(Request $request)
    {
        $request->attributes->get('AdminToken')?->delete();

        return ApiResponseService::success(null, 'Logged out.');
    }
}

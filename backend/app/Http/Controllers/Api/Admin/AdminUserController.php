<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUserRequest;
use App\Http\Resources\AdminUserResource;
use App\Models\AdminUser;
use App\Services\ApiResponseService;
use App\Services\UploadService;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $query = AdminUser::query()
            ->when($request->filled('search'), function ($q) use ($request): void {
                $search = $request->string('search');
                $q->where(fn ($inner) => $inner->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"));
            })
            ->when($request->filled('role'), fn ($q) => $q->where('role', $request->string('role')))
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->latest();

        return ApiResponseService::success(AdminUserResource::collection($query->get()));
    }

    public function store(AdminUserRequest $request, UploadService $uploads)
    {
        $data = $request->validated();
        $user = AdminUser::create([
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'password' => $data['password'],
            'role' => $data['role'],
            'profile_photo' => $uploads->imageFromInput($data['avatar'] ?? $data['profile_photo'] ?? null, 'admin-profiles'),
            'status' => $data['status'] ?? 'active',
        ]);

        return ApiResponseService::success(new AdminUserResource($user), 'User created.', 201);
    }

    public function show(AdminUser $adminUser)
    {
        return ApiResponseService::success(new AdminUserResource($adminUser));
    }

    public function update(AdminUserRequest $request, AdminUser $adminUser, UploadService $uploads)
    {
        $data = $request->validated();
        $payload = [
            'name' => $data['name'],
            'email' => strtolower($data['email']),
            'role' => $data['role'],
            'status' => $data['status'] ?? $adminUser->status,
        ];

        if (! empty($data['password'])) {
            $payload['password'] = $data['password'];
        }

        $photo = $uploads->imageFromInput($data['avatar'] ?? $data['profile_photo'] ?? null, 'admin-profiles');
        if ($photo) {
            $payload['profile_photo'] = $photo;
        }

        $adminUser->update($payload);

        return ApiResponseService::success(new AdminUserResource($adminUser->fresh()), 'User updated.');
    }

    public function destroy(Request $request, AdminUser $adminUser)
    {
        if ((int) $request->attributes->get('AdminUser')->id === (int) $adminUser->id) {
            return ApiResponseService::error('You cannot delete your own active account.', null, 422);
        }

        $adminUser->delete();

        return ApiResponseService::success(null, 'User deleted.');
    }
}

<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientLogoRequest;
use App\Http\Resources\ClientLogoResource;
use App\Models\ClientLogo;
use App\Services\ApiResponseService;
use App\Services\UploadService;
use Illuminate\Http\Request;

class ClientLogoController extends Controller
{
    public function index(Request $request)
    {
        $query = ClientLogo::query()
            ->when($request->filled('search'), fn ($q) => $q->where('name', 'like', '%'.$request->string('search').'%'))
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->orderBy('sort_order')
            ->latest();

        return ApiResponseService::success(ClientLogoResource::collection($query->get()));
    }

    public function store(ClientLogoRequest $request, UploadService $uploads)
    {
        $logo = ClientLogo::create($this->payload($request->validated(), $uploads));

        return ApiResponseService::success(new ClientLogoResource($logo), 'Logo created.', 201);
    }

    public function show(ClientLogo $clientLogo)
    {
        return ApiResponseService::success(new ClientLogoResource($clientLogo));
    }

    public function update(ClientLogoRequest $request, ClientLogo $clientLogo, UploadService $uploads)
    {
        $clientLogo->update($this->payload($request->validated(), $uploads, $clientLogo));

        return ApiResponseService::success(new ClientLogoResource($clientLogo->fresh()), 'Logo updated.');
    }

    public function destroy(ClientLogo $clientLogo)
    {
        $clientLogo->delete();

        return ApiResponseService::success(null, 'Logo deleted.');
    }

    private function payload(array $data, UploadService $uploads, ?ClientLogo $logo = null): array
    {
        return [
            'name' => $data['name'],
            'image' => array_key_exists('image', $data) ? $uploads->imageFromInput($data['image'], 'client-logos') : $logo?->image,
            'website_url' => $data['websiteUrl'] ?? $data['website_url'] ?? null,
            'status' => $data['status'] ?? 'active',
            'sort_order' => (int) ($data['sortOrder'] ?? $data['sort_order'] ?? 0),
        ];
    }
}

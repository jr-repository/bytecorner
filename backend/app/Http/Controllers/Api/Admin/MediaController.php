<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MediaItemRequest;
use App\Http\Resources\MediaItemResource;
use App\Models\MediaItem;
use App\Services\ApiResponseService;
use App\Services\UploadService;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $items = MediaItem::query()
            ->when($request->filled('search'), fn ($q) => $q->where('name', 'like', '%'.$request->string('search').'%'))
            ->latest()
            ->get();

        return ApiResponseService::success(MediaItemResource::collection($items));
    }

    public function store(MediaItemRequest $request, UploadService $uploads)
    {
        $source = $request->file('file') ?: $request->input('image');
        $url = $uploads->imageFromInput($source, 'media-library');
        $user = $request->attributes->get('AdminUser');
        $name = $request->input('name') ?: ($request->file('file')?->getClientOriginalName() ?: basename(parse_url($url, PHP_URL_PATH)));

        $media = MediaItem::create([
            'name' => $name,
            'url' => $url,
            'path' => str_contains($url, '/storage/') ? substr($url, strpos($url, '/storage/') + 9) : null,
            'mime_type' => $request->file('file')?->getMimeType(),
            'size' => $request->file('file')?->getSize(),
            'uploaded_by' => $user?->id,
        ]);

        return ApiResponseService::success(new MediaItemResource($media), 'Media uploaded.', 201);
    }

    public function destroy(MediaItem $mediaItem)
    {
        $mediaItem->delete();

        return ApiResponseService::success(null, 'Media deleted.');
    }
}

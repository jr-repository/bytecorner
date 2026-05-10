<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;

class UploadService
{
    public function imageFromInput(mixed $input, string $folder): ?string
    {
        if ($input instanceof UploadedFile) {
            $path = $input->store($folder, 'public');
            return Storage::disk('public')->url($path);
        }

        if (! is_string($input) || $input === '') {
            return null;
        }

        if (str_starts_with($input, 'http://') || str_starts_with($input, 'https://') || str_starts_with($input, '/storage/')) {
            return $input;
        }

        if (! preg_match('/^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,/', $input, $matches)) {
            return $input;
        }

        $extension = $matches[1] === 'svg+xml' ? 'svg' : str_replace('jpeg', 'jpg', $matches[1]);
        $payload = substr($input, strpos($input, ',') + 1);
        $binary = base64_decode($payload, true);

        if ($binary === false) {
            throw new InvalidArgumentException('Invalid image payload.');
        }

        $path = trim($folder, '/').'/'.date('Y/m').'/'.Str::uuid().'.'.$extension;
        Storage::disk('public')->put($path, $binary);

        return Storage::disk('public')->url($path);
    }

    public function imagesFromArray(mixed $input, string $folder): array
    {
        if (! is_array($input)) {
            return [];
        }

        return array_values(array_filter(array_map(fn (mixed $item) => $this->imageFromInput($item, $folder), $input)));
    }
}

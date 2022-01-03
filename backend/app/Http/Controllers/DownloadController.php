<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\Session;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    const SIZE_LIMIT = 20000000; // 20 MB

    private function isSessionExist($sessionNumber)
    {
        return Session::where('session_number', $sessionNumber)->exists();
    }

    private function isFileExist($fileName)
    {
        return File::where('file_name', $fileName)->exists();
    }

    public function get(Request $request, $session, $file, $password = null)
    {
        if (!$this->isSessionExist($session)) {
            return response()
                ->json(
                    ["message" => "session does not exist"],
                    Response::HTTP_BAD_REQUEST
                );
        }

        if (!$this->isFileExist($file)) {
            return response()
                ->json(
                    ["message" => "file does not exist"],
                    Response::HTTP_BAD_REQUEST
                );
        }

        $path = File::where('file_name', $file)->first()['path'];

        $headers = [
            header('Content-Disposition', 'attachment')
        ];

        return Storage::download($path, $file, $headers);
    }
}

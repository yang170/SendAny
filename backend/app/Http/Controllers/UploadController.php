<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\Session;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    const SIZE_LIMIT = 50000000; // 50 MB

    private function isSessionExist($sessionNumber)
    {
        return Session::where('session_number', $sessionNumber)->exists();
    }

    public function get(Request $request, $session)
    {
        if (!$this->isSessionExist($session)) {
            return response()
                ->json(
                    ["message" => "session does not exist"],
                    Response::HTTP_BAD_REQUEST
                );
        }

        $resp = array();
        $session_id = Session::where('session_number', $session)
            ->first()
            ->id;

        $files = File::where('session_id', $session_id)->get();
        foreach ($files as $file) {
            array_push($resp, [
                'fileName' => $file['file_name'],
                'createdAt' => $file['created_at']
            ]);
        }
        return response()->json($resp);
    }

    public function put(Request $request)
    {
        $session = $request->get('session_number');
        if (!$this->isSessionExist($session)) {
            return response()
                ->json(
                    ["message" => "session does not exist"],
                    Response::HTTP_BAD_REQUEST
                );
        }

        $file = $request->file('attachment');
        $size = $file ? $file->getSize() : 0;

        if ($file && $size <= UploadController::SIZE_LIMIT) {
            $path = Storage::putFile($session, $file);
            $originalName = $file->getClientOriginalName();

            $fileRecord = new File;
            $fileRecord->file_name = $originalName;
            $fileRecord->session_id = Session::where('session_number', $session)
                ->first()
                ->id;
            $fileRecord->path = $path;

            $fileRecord->save();
            return response()
                ->json(["message" => "success"], Response::HTTP_OK);
        } else if ($size > UploadController::SIZE_LIMIT) {
            return response()
                ->json(
                    ["message" => "file is too large"],
                    Response::HTTP_BAD_REQUEST
                );
        } else {
            return response()
                ->json(
                    ["message" => "no file attached"],
                    Response::HTTP_BAD_REQUEST
                );
        }
    }
}

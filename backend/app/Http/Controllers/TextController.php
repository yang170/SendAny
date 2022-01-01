<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Text;
use App\Models\Session;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class TextController extends Controller
{
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

        $session_id = Session::where('session_number', $session)
            ->first()
            ->id;

        $content = Text::where('session_id', $session_id)->first()->get()[0]["content"];

        return response()
            ->json(
                ['message' => 'success', 'content' => $content],
                Response::HTTP_OK
            );
    }

    public function put(Request $request)
    {
        $session = $request->get('session_number');
        $content = $request->get('content');

        if (!$session || !$content) {
            return response()
                ->json(
                    ["message" => "insufficient data"],
                    Response::HTTP_BAD_REQUEST
                );
        }

        if (!$this->isSessionExist($session)) {
            return response()
                ->json(
                    ["message" => "session does not exist"],
                    Response::HTTP_BAD_REQUEST
                );
        }

        $session_id = Session::where('session_number', $session)
            ->first()
            ->id;

        $text = new Text;
        $text->content = $content;
        $text->session_id = $session_id;
        $text->save();

        return response()
            ->json(
                ['message' => 'success', 'content' => $content],
                Response::HTTP_OK
            );
    }
}

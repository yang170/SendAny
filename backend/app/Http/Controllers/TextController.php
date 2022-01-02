<?php

namespace App\Http\Controllers;

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

        $content = "";
        if (Text::where('session_id', $session_id)->exists()) {
            $content = Text::where('session_id', $session_id)->first()["content"];
        }

        return response()
            ->json(
                ['message' => 'success', 'content' => $content],
                Response::HTTP_OK
            );
    }

    public function post(Request $request)
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

        if (Text::where('session_id', $session_id)->exists()) {
            $text = Text::where('session_id', $session_id)->first();
            $text->content = $content;
            $text->save();
        } else {
            $text = new Text;
            $text->session_id = $session_id;
            $text->content = $content;
            $text->save();
        }


        $text = Text::updateOrCreate(
            ['session_id' => $session_id],
            ['content' => $content]
        );

        return response()
            ->json(
                ['message' => 'success', 'content' => $text['content']],
                Response::HTTP_OK
            );
    }
}

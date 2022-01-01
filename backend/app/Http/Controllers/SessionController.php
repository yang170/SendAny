<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SessionController extends Controller
{

    const SESSION_NUMBER_LENGTH = 6;

    /**
     * Generate a random string, using a cryptographically secure 
     * pseudorandom number generator (random_int)
     *
     * This function uses type hints now (PHP 7+ only), but it was originally
     * written for PHP 5 as well.
     * 
     * For PHP 7, random_int is a PHP core function
     * For PHP 5.x, depends on https://github.com/paragonie/random_compat
     * 
     * @param int $length      How many characters do we want?
     * @param string $keyspace A string of all possible characters
     *                         to select from
     * @return string
     */
    private function randomSessionNumber(
        string $keyspace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    ): string {
        if (SessionController::SESSION_NUMBER_LENGTH < 1) {
            throw new \RangeException('Length must be a positive integer');
        }
        $pieces = [];
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < SessionController::SESSION_NUMBER_LENGTH; ++$i) {
            $pieces[] = $keyspace[random_int(0, $max)];
        }
        return implode('', $pieces);
    }

    private function isSessionExist($sessionNumber)
    {
        return Session::where('session_number', $sessionNumber)->exists();
    }

    /**
     * Get a random session number and put it to the database
     */
    private function addSessionNumToDB()
    {
        $sessionNumber = $this->randomSessionNumber();
        while ($this->isSessionExist($sessionNumber)) {
            $sessionNumber = $this->randomSessionNumber();
        }

        $session = new Session;
        $session->session_number = $sessionNumber;
        $session->save();

        return $sessionNumber;
    }

    public function get(Request $request)
    {
        $sessionNumber = $this->addSessionNumToDB();
        return response()
            ->json(
                ['message' => 'created', 'session_number' => $sessionNumber],
                Response::HTTP_OK
            );
    }

    public function delete(Request $request)
    {
        $sessionNumber = $request->get('session_number');
        if ($this->isSessionExist($sessionNumber)) {
            Session::where('session_number', $sessionNumber)->delete();
            Storage::deleteDirectory($sessionNumber);
            return response()->json(
                ['message' => 'deleted'],
                Response::HTTP_OK
            );
        } else {
            return response()->json(
                ['message' => 'failed'],
                Response::HTTP_BAD_REQUEST
            );
        }
    }
}

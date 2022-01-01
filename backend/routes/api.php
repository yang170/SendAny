<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\TextController;
use App\Http\Controllers\SessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/session', [SessionController::class, 'get']);
Route::delete('/session', [SessionController::class, 'delete']);

Route::get('/upload/{session}', [FileController::class, 'get']);
Route::post('/upload', [FileController::class, 'put']);

Route::get('/text/{session}', [TextController::class, 'get']);
Route::put('/text', [TextController::class, 'put']);

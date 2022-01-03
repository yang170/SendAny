<?php

use App\Http\Controllers\DownloadController;
use App\Http\Controllers\UploadController;
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

Route::get('/session/{session?}', [SessionController::class, 'get']);
Route::delete('/session', [SessionController::class, 'delete']);

Route::get('/upload/{session}', [UploadController::class, 'get']);
Route::post('/upload', [UploadController::class, 'put']);

Route::get(
    '/download/{session}/{file}/{password?}',
    [DownloadController::class, 'get']
);

Route::get('/text/{session}', [TextController::class, 'get']);
Route::post('/text', [TextController::class, 'post']);

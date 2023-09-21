<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function() {
    // routes for books module using apiResource
    Route::apiResource('books', BookController::class);

    // routes for sections/subsections module using Controller group
    Route::controller(SectionController::class)->group(function () {
        Route::get('/books/{book}/sections', 'index');
        Route::get('/books/{book}/sections/{section}', 'show');
        Route::post('/books/{book}/sections', 'store');
        Route::put('/books/{book}/sections/{section}', 'update');
        Route::delete('/books/{book}/sections/{section}', 'destroy');
        Route::get('/books/{book}/sections/{section}/subsections', 'subsections');
    });

    // route for login
    Route::post('/login', [AuthController::class, 'login']);
});

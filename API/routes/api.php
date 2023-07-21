<?php
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// poblic end point
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes

Route::group(['middleware' => ['auth:sanctum']], function () {
    // user end point
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/user/delete', [AuthController::class, 'deletUser']);
    // project end point
    Route::post('/projects', [ProjectController::class, 'creatProject']);
    Route::post('/projects/{id}/delete', [ProjectController::class, 'deleteProject']);
    Route::post('/projects/{id}/render', [ProjectController::class, 'allProject']);
    Route::post('/projects/{id}', [ProjectController::class, 'saveProject']);
    Route::post('/projects/{id}/one', [ProjectController::class, 'oneProject']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

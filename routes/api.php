<?php

use App\Http\Controllers\GameController;
use App\Http\Middleware\CheckUserExists;
use Illuminate\Support\Facades\Route;

// On crée la game en tant qu'utilisateur, la game est créée et on est game master
Route::post('/game', [GameController::class, 'createGame']);

// On join la game en tant qu'utilisateur
Route::post('/game/{id}/join', [GameController::class, 'joinGame']);

Route::middleware([CheckUserExists::class])->group(function () {
    // On quitte la game. Si on est GM la game est supprimée et les joueurs aussi
    Route::post('/game/{id}/leave', [GameController::class, 'leaveGame']);
});

<?php

use App\Http\Controllers\GameController;
use App\Http\Middleware\CheckUserExists;
use Illuminate\Support\Facades\Route;

// On crée la game en tant qu'utilisateur, la game est créée et on est game master
Route::post('/games', [GameController::class, 'createGame']);

// On join la game en tant qu'utilisateur
Route::post('/games/{id}/join', [GameController::class, 'joinGame']);

Route::middleware([CheckUserExists::class])->group(function () {
    Route::post('/games/{id}/status', [GameController::class, 'updateGameStatus']);

    Route::get('/games/{id}', [GameController::class, 'getGame']);

    // On quitte la game. Si on est GM la game est supprimée et les joueurs aussi
    Route::post('/games/{id}/leave', [GameController::class, 'leaveGame']);

    // On vide les messages de la game
    Route::post('/games/{id}/messages/clear', [GameController::class, 'clearGameMessages']);

    // Un utilisateur post un message
    Route::post('/games/{id}/messages', [GameController::class, 'postGameMessage']);

    Route::get('/games/{id}/messages', [GameController::class, 'getGameMessages']);

    Route::get('/games/{id}/players', [GameController::class, 'getPlayers']);

    Route::get('/game/{id}/is-game-master');
});

Route::get('/games', [GameController::class, 'getGames']);

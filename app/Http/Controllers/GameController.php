<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameToUser;
use App\Models\Message;
use App\Models\User;
use App\Models\UserGameMaster;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class GameController extends Controller
{
    public function createGame(Request $request) {
        $name = $request->input('name');

        $gameMaster = $request->input('game_master');

        if (!$name || !$gameMaster) {
            abort(400, 'No name for game or no gameMaster provided!');
        }

        $game = new Game([
            'name' => $name,
        ]);

        $game->save();
        $game->refresh();

        $user = new User([
            'name' => $gameMaster,
        ]);

        $user->uuid = Str::uuid();

        $user->save();
        $user->refresh();

        $gameToUser = new GameToUser([
            'game_id' => $game->id,
            'user_id' => $user->id
        ]);

        $gameToUser->save();

        (new UserGameMaster([
            'user_id' => $user->id,
        ]))->save();

        return response()->json([
            'user-secret' => Crypt::encryptString($user->uuid)
        ]);
    }

    public function joinGame(Request $request, int $id) {
        $game = Game::query()->find($id);

        if (!$game) {
            abort(404, 'No game found with id ' . $id . '!');
        }

        $userInput = $request->input('user');

        if (!$userInput) {
            abort(400, 'No user sent in request!');
        }

        $user = new User([
            'name' => $userInput,
        ]);

        $user->uuid = Str::uuid();

        $user->save();
        $user->refresh();

        (new GameToUser([
            'game_id' => $game->id,
            'user_id' => $user->id,
        ]))->save();

        // TODO broadcast user joined

        return response()->json([
            'user-secret' => Crypt::encryptString($user->uuid)
        ]);
    }

    public function leaveGame(Request $request, int $id) {
        $game = Game::query()->find($id);

        if (!$game) {
            abort(404, 'No game found with id ' . $id . '!');
        }

        /**
         * @var User $user
         */
        $user = Context::get(Utils::CONTEXT_USER_KEY);

        if ($user->isGameMaster()) {
            // On supprime les utilisateurs de la game
            $gamesToUsersIds = GameToUser::query()->where('game_id', $game->id)->pluck('user_id');

            GameToUser::query()->where('game_id', $game->id)->delete();
            UserGameMaster::query()->where('user_id', $user->id)->delete();

            // On supprime les messages de la game
            Message::query()->whereIn('id', $game->messages()->pluck('id'))->delete();

            // On supprime la game
            $game->delete();

            // TODO broadcast fin de la game

            User::query()->whereIn('id', $gamesToUsersIds)->delete();
        } else {
            GameToUser::query()->where('user_id', $user->id)->delete();
            User::query()->where('id', $user->id)->delete();

            // TODO broadcast utilisateur déco
        }
    }

    public function clearGameMessages(Request $request, int $id) {
        $game = Game::query()->find($id);

        if (!$game) {
            abort(404, 'No game found with id ' . $id . '!');
        }

        $user = Context::get(Utils::CONTEXT_USER_KEY);

        if (!$user->isGameMaster()) {
            abort(403, 'User has to be game master to clear messages!');
        }

        Message::query()->whereIn('id', $game->messages()->pluck('id'))->delete();

        // TODO broadcast messages deleted
    }

    public function postGameMessage(Request $request, int $id) {
        $game = Game::query()->find($id);

        if (!$game) {
            abort(404, 'No game found with id ' . $id . '!');
        }

        $messageContent = $request->input('message');

        if (!$messageContent) {
            abort(400, 'No message found in body!');
        }

        /**
         * @var User $user
         */
        $user = Context::get(Utils::CONTEXT_USER_KEY);

        $message = new Message([
            'user_id' => $user->id,
            'game_id' => $game->id,
            'message' => $messageContent
        ]);

        // TODO Broadcast un message a été posté
    }
}

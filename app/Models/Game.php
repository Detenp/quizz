<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property string $name
 * @property array{show_messages: bool} $game_status
 */
class Game extends Model
{
    use HasFactory;

    protected $table = 'games';

    protected $fillable = [
        'name',
        'status'
    ];

    protected $casts = [
        'status' => 'array'
    ];

    public function players(): Collection
    {
        $gameToUsersIds = GameToUser::query()->where('game_id', $this->id)->get()->pluck('user_id');

        return User::query()->whereIn('id', $gameToUsersIds)->get();
    }

    public function gameMaster(): User
    {
        $userGameMasterId = UserGameMaster::query()->where('game_id', $this->id)->first()->user_id;

        return User::query()->first($userGameMasterId);
    }

    public function messages(): Collection
    {
        return Message::query()->where('game_id', $this->id)->get();
    }
}

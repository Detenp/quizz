<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property string $name
 */
class Game extends Model
{
    use HasFactory;

    protected $table = 'games';

    protected $fillable = [
        'name'
    ];

    public function players(): Collection
    {
        return GameToUser::query()->where('game_id', $this->id)->get();
    }

    public function gameMaster(): Collection
    {
        return UserGameMaster::query()->where('game_id', $this->id)->get();
    }

    public function messages(): Collection
    {
        return Message::query()->where('game_id', $this->id)->get();
    }
}

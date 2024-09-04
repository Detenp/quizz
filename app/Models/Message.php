<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $user_id
 * @property int $game_id
 * @property string $message
 */
class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_id',
        'message'
    ];

    protected $table = 'messages';

    public function player(): User
    {
        return User::query()->find($this->user_id);
    }
}

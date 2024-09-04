<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $game_id
 * @property int $user_id
 */
class GameToUser extends Model
{
    use HasFactory;

    protected $table = 'games_to_users';

    public $incrementing = false;

    protected $primaryKey = null;

    protected $fillable = [
        'game_id',
        'user_id'
    ];
}

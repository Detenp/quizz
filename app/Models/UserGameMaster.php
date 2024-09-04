<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $user_id
 */
class UserGameMaster extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];

    public $incrementing = false;

    protected $primaryKey = null;

    protected $table = 'users_games_masters';
}

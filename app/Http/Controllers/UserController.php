<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Context;

class UserController extends Controller
{
    public function create(User $user): void {
        $user->save();
    }

    public function get(int $id): User {
        return User::query()->find($id);
    }

    public function delete(int $id): void {
        $currentUser = Context::get('currentUser');

        if ($currentUser)

        User::query()->find($id)->delete();
    }
}

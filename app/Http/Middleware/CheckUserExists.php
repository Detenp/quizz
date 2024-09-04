<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Utils\Utils;
use Closure;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Crypt;
use Symfony\Component\HttpFoundation\Response;

class CheckUserExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $encryptedUuid = $request->header('X-ID');

        if (!$encryptedUuid) {
            abort(400, 'Header ID not provided!');
        }

        try {
            $decryptedUuid = Crypt::decryptString($encryptedUuid);;
        } catch (DecryptException) {
            abort(400, 'Header ID is not encrypted correctly!');
        }

        $user = User::query()->where('uuid', $decryptedUuid)->first();
        if (!$user) {
            abort(400, 'User not found!');
        }

        Context::add(Utils::CONTEXT_USER_KEY, $user);

        // If the user exists, he can continue
        return $next($request);
    }
}

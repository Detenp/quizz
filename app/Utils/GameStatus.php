<?php

namespace App\Utils;

class GameStatus implements \JsonSerializable
{
    public bool $showMessages;

    public function __construct(array $inputs) {
        if (!isset($inputs['show_messages'])) {
            abort(400, 'show_messages not set in game_status!');
        }

        $this->showMessages = $inputs['show_messages'];
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize(): mixed
    {
        return [
            'show_messages' => $this->showMessages
        ];
    }
}

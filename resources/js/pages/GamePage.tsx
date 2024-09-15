import User from "@/models/User.interface";
import {useParams} from "react-router-dom";
import {useState} from "react";
import Message from "@/models/Message.interface";
import Game from "@/models/Game.interface";
import HttpClient from "@/services/HttpClient.service";

export default function GamePage() {
    const httpClient: HttpClient = HttpClient.HttpClient()

    const { id } = useParams();

    const [players, updatePlayers] = useState<User[]>([])
    const [messages, updateMessages] = useState<Message[]>([])
    const [game, updateGame] = useState<Game>()

    setTimeout(() => {
        httpClient.get('games/' + id).then((response: Game) => {
            console.log(response)
            updateGame(response)
        })

        httpClient.get('games/' + id + '/messages').then((response: Message[]) => {
            updateMessages(response)
        })

        httpClient.get('games/' + id + '/players').then((response: User[]) => {
            updatePlayers(response)
        })
    }, 1_000)

    return (
        <>
            Game name : {game?.name}

            Game players: {players.map((player) => player.name + ',')}

            Game messages: {messages.map((message) => message.message)}
        </>
    )
}

import User from "@/models/User.interface";
import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import Message from "@/models/Message.interface";
import Game from "@/models/Game.interface";
import HttpClient from "@/services/HttpClient.service";

export default function GamePage() {
    const httpClient: HttpClient = HttpClient.HttpClient()

    const { id } = useParams();

    const [players, updatePlayers] = useState<User[]>([])
    const [messages, updateMessages] = useState<Message[]>([])
    const [game, updateGame] = useState<Game>()

    const [messageFormData , setMessageFormData] = useState({
        message: ''
    })

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

    function handleFormMessageChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setMessageFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    function handleWriteMessageSubmit(event: FormEvent) {
        event.preventDefault()
        event.stopPropagation()

        httpClient.post(`games/${id}/messages`, {
            message: messageFormData.message
        }).then(() => {
            console.log('message sent!')
        })
    }

    window.addEventListener('beforeunload', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        httpClient.post(`games/${id}/leave`, {}).then(() => {
            ev.
            console.log('game deleted.')
        })
    })

    return (
        <>
            Game name : {game?.name}

            Game players: {players.map((player) => player.name + ',')}

            Game messages: {messages.map((message) => message.message + ',')}

            <br/>

            Write a message :
            <form onSubmit={handleWriteMessageSubmit}>
                <input
                    className={"form-control"}
                    name={"message"}
                    type={"text"}
                    placeholder={"Message"}
                    aria-label={"Message"}
                    value={messageFormData.message}
                    onChange={handleFormMessageChange}
                />
                <input type="submit" className="btn btn-primary" value={"Submit"}/>
            </form>
        </>
    )
}

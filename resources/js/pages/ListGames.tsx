import Game from "@/models/Game.interface";
import HttpClient from "@/services/HttpClient.service";
import {useState} from "react";
import ShowGameComponent from "@/components/ShowGameComponent";

export default function ListGames() {
    const httpClient: HttpClient = HttpClient.HttpClient()
    const [games, updateGames] = useState<Game[]>([])

    setTimeout(() => {
        httpClient.get('games').then((response: Game[]) => {
            updateGames(response)
        })
    }, 3_000)

    return (
        <>
            <p>List games</p>
            {games.map(game => <ShowGameComponent key={game.id} name={game.name} playerCount={0}></ShowGameComponent>)}
        </>
    )
}



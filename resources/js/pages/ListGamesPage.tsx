import Game from "@/models/Game.interface";
import HttpClient from "@/services/HttpClient.service";
import {useState} from "react";
import ShowGameComponent from "@/components/ShowGameComponent";
import CreateGameModal from "@/components/CreateGameModal";
import {useNavigate} from "react-router-dom";

export default function ListGamesPage() {
    const navigate = useNavigate()
    const httpClient: HttpClient = HttpClient.HttpClient()
    const [games, updateGames] = useState<Game[]>([])

    setTimeout(() => {
        httpClient.get('games').then((response: Game[]) => {
            updateGames(response)
        })
    }, 3_000)

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleFormOutput(output: {username: string, gameName: string}) {
        httpClient.post('games', {
            name: output.gameName,
            game_master: output.username
        }).then((response: {'user-secret': string, game_id: number}) => {
            httpClient.setClientId(response["user-secret"])

            navigate('/game/' + response.game_id)
        })
    }

    return (
        <>
            <CreateGameModal show={isModalOpen} handleClose={handleCloseModal} formOutput={handleFormOutput}/>
            <div className="d-flex flex-row justify-content-center w-100 mt-5">
                <div className="d-flex flex-column justify-content-center align-items-center w-50 position-relative">
                    <h2 className="position-absolute"
                        style={{
                            left: "50%",
                            transform: "translate(-50%, -150%)"
                        }}>List games</h2>
                    <div className="d-flex w-100 justify-content-end">
                        <button className="btn btn-primary ml-auto align-self-center" onClick={handleOpenModal}>Create</button>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center mt-3 w-100">
                        {games.map(game => <ShowGameComponent key={game.id} name={game.name} playerCount={0}></ShowGameComponent>)}
                    </div>
                </div>
            </div>
        </>
    )
}



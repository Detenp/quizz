export default function ShowGameComponent({name, playerCount}) {
    return (
        <>
            <div className="d-flex flex-row align-items-center w-50 justify-content-center">
                <div className="d-flex flex-row w-50 justify-content-end">
                    <div>{name}, </div>
                    <div className="ml-1">{playerCount} {playerCount === 1 ? 'player' : 'players'}</div>
                </div>
                <div className="d-flex w-50">
                    <button className="ml-5 btn btn-secondary">Join</button>
                </div>
            </div>
        </>
    )
}

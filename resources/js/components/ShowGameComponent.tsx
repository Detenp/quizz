export default function ShowGameComponent({name, playerCount}) {
    return (
        <>
            <div className="d-flex flex-row align-items-center w-50 justify-content-center">
                <div>{name}</div>
                <div className="ml-1">{playerCount}</div>
                <button className="ml-5 btn btn-secondary">Join</button>
            </div>
        </>
    )
}

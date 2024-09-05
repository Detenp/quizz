export default function ShowGameComponent({name, playerCount}) {
    return (
        <>
            <>{name}</>
            <>{playerCount}</>
            <button>Join</button>
        </>
    )
}

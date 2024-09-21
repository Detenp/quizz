export default interface Game {
    id: number,
    name: string,
    game_status: {
        show_messages: boolean
    },
    players_count: number
}

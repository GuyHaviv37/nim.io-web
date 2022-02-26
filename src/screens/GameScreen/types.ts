export type Game = {
    id: string;
    heaps: number[];
    originalHeaps: number[];
    player1: string | null;
    player2: string | null;
    playersConnected: number;
    currentPlayerTurn: string;
    isPlayer1Ready: boolean;
    isPlayer2Ready: boolean;
}
export const ENDPOINT = 'https://nim-io-server.herokuapp.com/';
export const CLIENT = 'https://clever-panini-c8e22f.netlify.app';

// DEV:
// export const ENDPOINT = 'http://localhost:8080';
// export const CLIENT = 'http://localhost:3000';

export const EMPTY_GAME = {
    id: '',
    heaps: [],
    originalHeaps: [],
    player1: null,
    player2: null,
    playersConnected: 0,
    currentPlayerTurn: '',
    isPlayer1Ready: false,
    isPlayer2Ready: false,
}

export const MAX_HEAP_SIZE = 25;

export const getRandomizedHeaps = () => {
    return new Array(3).fill(1).map(() => Math.floor(Math.random() * 100) % 25 + 1);
}
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PreGameScreen from './PreGameScreen';
import ActiveGameScreen from './ActiveGameScreen';
import { useEstablishGame } from './hooks';
import { CLIENT, ENDPOINT } from '../../constants';
import { io } from 'socket.io-client';

type GameScreenLocation = { state: { heaps: number[] } };

interface GameScreenProps {
}

//@TODO: add meaningful error callback
export const errorCallback = (e: any) => e && console.error(e);

const GameScreen: React.FC<GameScreenProps> = (props) => {
    const socket = useMemo(() => io(ENDPOINT),[]);
    const { state } = useLocation() as GameScreenLocation;
    const { gameId = '1', playerId = '0' } = useParams();
    const navigate = useNavigate();
    const { playerNo, game, winnerId } = useEstablishGame(socket, gameId, parseInt(playerId), state?.heaps);
    const isGameReady = game.isPlayer1Ready && game.isPlayer2Ready;
    const socketId = playerNo === 1 ? game.player1 : game.player2;

    const toggleReady = useCallback(() => {
        let isReady = false;
        if (playerNo === 1) isReady = !game.isPlayer1Ready;
        if (playerNo === 2) isReady = !game.isPlayer2Ready;
        socket.emit('toggleReady', {isReady}, errorCallback);
    }, [playerNo, game.isPlayer1Ready, game.isPlayer2Ready]);

    const submitMove = useCallback((heapIndex, amount) => {
        socket.emit('gameMove', {
            heapIndex,
            amount,
        }, errorCallback);
    }, [])
    
    return (
        <div className="pt-5">
            <h2 
                className='font-semibold text-4xl text-center tracking-wide text-indigo-500 cursor-pointer'
                onClick={() => navigate('/')}
            >
                Nim.io
            </h2>
            <div className="mt-9 px-10">
                {isGameReady ?
                    <ActiveGameScreen
                        heaps={game.heaps}
                        submitMove={submitMove}
                        isWinner={winnerId === socketId}
                    /> :
                    <PreGameScreen
                        toggleReady={toggleReady}
                        isPlayerReady={playerNo === 1 ? game.isPlayer1Ready : game.isPlayer2Ready}
                        isOpponentConnected={playerNo === 1 ? game.player2 : game.player1}
                        isOpponentReady={playerNo === 1 ? game.isPlayer2Ready : game.isPlayer1Ready}
                        inviteUrl={`${CLIENT}/game/${gameId}/2`}
                    />}
            </div>
            {/* Footer: */}
            {/* Error Toast */}
        </div>
    )
}

export default GameScreen;

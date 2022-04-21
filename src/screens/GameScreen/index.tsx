import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PreGameScreen from './PreGameScreen';
import ActiveGameScreen from './ActiveGameScreen';
import { useEstablishGame } from './useEstablishGame';
import { ENDPOINT } from '../../constants';
import { io } from 'socket.io-client';
import GameOverBanner from '../../components/GameOverBanner';
import { NimSocketError } from '../../useErrors';

type GameScreenLocation = { state: { heaps: number[] } };
interface GameScreenProps {
    errorCallback: (e: NimSocketError) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({errorCallback}) => {
    const socket = useMemo(() => io(ENDPOINT), []);
    const { state } = useLocation() as GameScreenLocation;
    const { gameId = '1', playerId = '0' } = useParams();
    const { playerNo, game, winnerId, gameLog } = useEstablishGame(socket, gameId, parseInt(playerId), errorCallback, state?.heaps);
    const navigate = useNavigate();
    const isGameReady = game.isPlayer1Ready && game.isPlayer2Ready;
    const socketId = playerNo === 1 ? game.player1 : game.player2;

    const toggleReady = useCallback(() => {
        let isReady = false;
        if (playerNo === 1) isReady = !game.isPlayer1Ready;
        if (playerNo === 2) isReady = !game.isPlayer2Ready;
        socket.emit('toggleReady', { isReady }, errorCallback);
    }, [playerNo, game.isPlayer1Ready, game.isPlayer2Ready]);

    const submitMove = useCallback((heapIndex, amount) => {
        socket.emit('gameMove', {
            heapIndex,
            amount,
        }, errorCallback);
    }, [])

    const restartGame = useCallback((newHeaps?: number[]) => {
        socket.emit('restartGame',{roomId: gameId, newHeaps}, errorCallback);
    }, [gameId]);

    return (
        <div className="pt-5">
            <h2
                className='font-semibold text-4xl text-center tracking-wide text-indigo-500 cursor-pointer'
                onClick={() => navigate('/')}
            >
                Nim.io
            </h2>
            {winnerId === undefined ?
                <div className="mt-9 px-10">
                    {isGameReady ?
                        <ActiveGameScreen
                            heaps={game.heaps}
                            submitMove={submitMove}
                            currentPlayerTurn={game.currentPlayerTurn}
                            socketId={socketId}
                            gameLog={gameLog}
                        /> :
                        <PreGameScreen
                            toggleReady={toggleReady}
                            isPlayerReady={playerNo === 1 ? game.isPlayer1Ready : game.isPlayer2Ready}
                            isOpponentConnected={playerNo === 1 ? game.player2 : game.player1}
                            isOpponentReady={playerNo === 1 ? game.isPlayer2Ready : game.isPlayer1Ready}
                            gameId={gameId}
                        />}
                </div>
            :   <GameOverBanner
                    isWinner={winnerId === socketId}
                    restartGame={restartGame}
                />
            }
        </div>
    )
}

export default React.memo(GameScreen);

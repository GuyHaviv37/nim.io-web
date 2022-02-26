import React, { useCallback, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import socketContext from '../../context/socket-context';
import PreGameScreen from './PreGameScreen';
import ActiveGameScreen from './ActiveGameScreen';
import { useEstablishGame } from './hooks';

type GameScreenLocation = { state: { heaps: number[] } };

interface GameScreenProps {
}

//@TODO: add meaningful error callback
export const errorCallback = (e: any) => e && console.error(e);

const GameScreen: React.FC<GameScreenProps> = (props) => {
    const socket = useContext(socketContext)
    const { state } = useLocation() as GameScreenLocation;
    const { gameId = '1', playerId = '0' } = useParams();
    const { playerNo, game, setGame } = useEstablishGame(socket, gameId, parseInt(playerId), state?.heaps);
    const isGameReady = game.isPlayer1Ready && game.isPlayer2Ready;

    const toggleReady = useCallback(() => {
        let isReady = false;
        if (playerNo === 1) isReady = !game.isPlayer1Ready;
        if (playerNo === 2) isReady = !game.isPlayer2Ready;
        console.log('at toggleReady - sending: ', isReady);
        socket.emit('toggleReady', {isReady}, errorCallback);
    }, [playerNo, game.isPlayer1Ready, game.isPlayer2Ready]);

    return (
        <div className="pt-5">
            <h2 className='font-semibold text-4xl text-center tracking-wide text-indigo-500'>Nim.io</h2>
            <div className="mt-9 px-10">
                {isGameReady ?
                    <ActiveGameScreen /> :
                    <PreGameScreen
                        toggleReady={toggleReady}
                        isPlayerReady={playerNo === 1 ? game.isPlayer1Ready : game.isPlayer2Ready}
                        isOpponentConnected={playerNo === 1 ? game.player2 : game.player1}
                        isOpponentReady={playerNo === 1 ? game.isPlayer2Ready : game.isPlayer1Ready}
                    />}
            </div>
            {/* Footer: */}
            {/* Error Toast */}
        </div>
    )
}

export default GameScreen;

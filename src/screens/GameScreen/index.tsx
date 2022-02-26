import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import socketContext from '../../context/socket-context';
import PreGameScreen from './PreGameScreen';
import ActiveGameScreen from './ActiveGameScreen';
import {useEstablishGame} from './hooks';

type GameScreenLocation =  {state: {heaps: number[]}};

interface GameScreenProps {
}

const GameScreen: React.FC<GameScreenProps> = (props) => {
    const socket = useContext(socketContext)
    const {state} = useLocation() as GameScreenLocation;
    const {gameId = '1', playerId = '0'} = useParams();
    const {playerNo, game, setGame} = useEstablishGame(socket, gameId, playerId, state?.heaps);
    const isGameReady = game.isPlayer1Ready && game.isPlayer2Ready;
    return (
        <div>
            <h2>Game Screen</h2>
            {isGameReady ? 
            <ActiveGameScreen/> :
            <PreGameScreen/>}
            {/* Pre-Game [toggleReady] */}
            {/* Invite */}
            {/* Ready selector and status */}
            {/* Active Game: [gameUpdate, gameOver - listeners], [sendMove, onGameRestart - emitters]*/}
            {/* Heaps */}
            {/* Amount selector | submit button - enabled/disabled by turn */}
            {/* Footer: */}
            {/* Error Toast */}
        </div>
    )
}

export default GameScreen;

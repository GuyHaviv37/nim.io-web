import React from 'react';
import Button from './Button';

interface GameOverBannerProps {
    isWinner: boolean;
    restartGame: () => void;
}

const GameOverBanner: React.FC<GameOverBannerProps> = (props) => {
    const {isWinner, restartGame} = props;

    return (
        <div className="mt-9 mx-auto w-1/2 rounded bg-indigo-300 max-w-md flex flex-col justify-center items-center px-2 py-4">      
            <h4 className="text-center text-lg lg:text-2xl xl:text-3xl tracking-wide font-semibold">{isWinner ? 'You won!': 'You lost..'}</h4>
            <br></br>
            <Button label="Restart Game" onPress={restartGame}/>
        </div>
    )
}

export default GameOverBanner;

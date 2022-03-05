import React from 'react';
import Button from './Button';

interface GameOverBannerProps {
    isWinner: boolean;
    restartGame: () => void;
}

const GameOverBanner: React.FC<GameOverBannerProps> = (props) => {
    const {isWinner, restartGame} = props;

    return (
        <div className="mt-9 mx-auto w-4/5 border-2 border-black max-w-lg">      
            <h4 className="text-center text-lg tracking-wide font-semibold">{isWinner ? 'You won!': 'You lost..'}</h4>
            <Button label="Restart Game" onPress={restartGame}/>
        </div>
    )
}

export default GameOverBanner;

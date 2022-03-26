import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomizedHeaps } from '../constants';
import Button from './Button';

interface GameOverBannerProps {
    isWinner: boolean;
    restartGame: (newHeaps?: number[]) => void;
}

const GameOverBanner: React.FC<GameOverBannerProps> = (props) => {
    const {isWinner, restartGame} = props;
    const navigate = useNavigate();

    return (
        <div className="mt-9 mx-auto w-1/2 rounded bg-indigo-300 max-w-md flex flex-col justify-center items-center px-2 py-4">      
            <h4 className="text-center text-lg lg:text-2xl xl:text-3xl tracking-wide font-semibold">{isWinner ? 'You won!': 'You lost..'}</h4>
            <br></br>
            <p className="mb-2">Restart Game?</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button label="Same Heaps" onPress={() => restartGame()}/>
                <Button label="Randomize" onPress={() => restartGame(getRandomizedHeaps())}/>
                <Button label="New Custom Sizes" onPress={() => navigate('/')}/>
            </div>
        </div>
    )
}

export default GameOverBanner;

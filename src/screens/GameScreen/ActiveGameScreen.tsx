import React, { useCallback, useState } from 'react';
import HeapInput from '../../components/HeapInput';
import Button from '../../components/Button';
import HeapDisplay from '../../components/HeapDisplay';
import { MAX_HEAP_SIZE } from '../../constants';
import { GameLogEntry } from './types';

interface ActiveGameScreenProps {
    heaps: number[];
    submitMove: (heapIndex: number | undefined, amount: number) => void;
    currentPlayerTurn: string;
    socketId: string | null;
    gameLog: GameLogEntry[];
}

const ActiveGameScreen: React.FC<ActiveGameScreenProps> = (props) => {
    const {heaps, submitMove, currentPlayerTurn, socketId, gameLog} = props;
    const [selectedHeap, setSelectedHeap] = useState<number | undefined>();
    const [amountToRemove, setAmountToRemove] = useState(1);
    const isTurn = currentPlayerTurn === socketId;

    const submitMoveHandler = useCallback(() => {
        submitMove(selectedHeap, amountToRemove);
    }, [selectedHeap, amountToRemove, submitMove]);

    return (
        <div>
            <div className="bg-indigo-200 rounded flex flex-col mx-auto items-center space-y-3 pt-3 pb-5 max-w-3xl">
            {/* Active Game: [gameUpdate, gameOver - listeners], [sendMove, onGameRestart - emitters]*/}
            {/* Heaps */}
                <div className="flex space-x-3">
                    <HeapDisplay blocks={heaps[0]} selectHeap={() => setSelectedHeap(0)} isSelected={selectedHeap === 0}/>
                    <HeapDisplay blocks={heaps[1]} selectHeap={() => setSelectedHeap(1)} isSelected={selectedHeap === 1}/>
                    <HeapDisplay blocks={heaps[2]} selectHeap={() => setSelectedHeap(2)} isSelected={selectedHeap === 2}/>
                </div>
            {/* Amount selector | submit button - enabled/disabled by turn */}
                <HeapInput name="amountToRemove" value={amountToRemove} setValue={setAmountToRemove}
                maxValue={selectedHeap !== undefined ? heaps[selectedHeap] : MAX_HEAP_SIZE}/>
                <Button label='Submit' onPress={submitMoveHandler} disabled={!isTurn}/>
            </div>
            <div className="flex flex-col pt-3 justify-center mx-auto max-w-3xl">
                <h5 className="text-md font-semibold sm:text-lg lg:text-xl text-center pb-3">Game log:</h5>
                {gameLog.length > 0 && 
                <ul className="bg-indigo-100 p-2 text-sm text-center sm:text-md lg:text-lg lg:font-thin flex flex-col overflow-y-auto max-h-28 md:max-h-96">
                    {gameLog.map(({playerTurn, heapIndex, amount}, index) => {
                        const reverseIndex = gameLog.length - index;
                        const isMyTurn = socketId === playerTurn
                        return (
                            <li key={index} className="py-1 italic">
                                {`${reverseIndex}) `}
                                <span className={`${isMyTurn ? 'text-green-600' : 'text-red-600'}`}>{`${isMyTurn ? 'You' : 'Opponent'} `}</span>
                                {`removed ${amount} items from stack ${heapIndex+1}`}
                            </li>
                        )
                    })}
                </ul>}
            </div>
        </div>
    )
}

export default ActiveGameScreen;

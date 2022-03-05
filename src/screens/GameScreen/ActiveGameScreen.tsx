import React, { useCallback, useState } from 'react';
import HeapInput from '../../components/HeapInput';
import Button from '../../components/Button';
import HeapDisplay from '../../components/HeapDisplay';
import { MAX_HEAP_SIZE } from '../../constants';

interface ActiveGameScreenProps {
    heaps: number[];
    submitMove: (heapIndex: number, amount: number) => void;
    isWinner?: boolean;
}

const ActiveGameScreen: React.FC<ActiveGameScreenProps> = (props) => {
    const {heaps, submitMove, isWinner} = props;
    const [selectedHeap, setSelectedHeap] = useState<number | undefined>();
    const [amountToRemove, setAmountToRemove] = useState(1);

    const submitMoveHandler = useCallback(() => {
        if (selectedHeap !== undefined) {
            submitMove(selectedHeap, amountToRemove);
        } else {
            console.log('no heap is selected');
        }
    }, [selectedHeap, amountToRemove, submitMove]);

    return (
        <div>
            {isWinner && 'You Won !'}
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
                <Button label='Submit' onPress={submitMoveHandler}/>
            </div>
        </div>
    )
}

export default ActiveGameScreen;

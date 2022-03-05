import React from 'react';
import {MAX_HEAP_SIZE} from '../constants';

interface HeapDisplayProps {
    blocks: number;
    selectHeap: () => void;
    isSelected: boolean;
}

const renderGridBlocks = (blocks: number) => {
    const cells = [];
    for(let i=0; i < MAX_HEAP_SIZE ; i++){
        const isFilled = i >= MAX_HEAP_SIZE - blocks;
        cells.push(
            <div key={`${isFilled ? `filled_${i}` : `empty_${i}`}`} 
            className={`rounded
            sm:w-5 sm:h-5
            md:w-6 md:h-6
            lg:w-7 lg:h-7 
            ${isFilled ? 'bg-blue-500' : ''}`}>
                <p className="text-xs text-center lg:font-thin leading-[inherit]
                md:text-sm lg:text-lg">{i === 0 && blocks}</p>
            </div>
        )
    }
    return cells;
}

const renderRowBlocks = (blocks: number) => {
    const cells = [];
    const thershold = 5 - Math.ceil(blocks / 5);
    for (let i=0; i < MAX_HEAP_SIZE / 5 ; i++) {
        const isFilled = i >= thershold;
        cells.push(
            <div key={`row_$${i}`}className={`
            ${isFilled ? 'bg-blue-500' : ''}
            ${i === thershold ? 'rounded-t' : ''}
            ${i === 4 ? 'rounded-b': ''} `}></div>
        )
    }
    return cells;
}

const HeapDisplay: React.FC<HeapDisplayProps> = (props) => {
    const {blocks, selectHeap, isSelected} = props;

    return (
        <div className='flex flex-col'>
            <div className="hidden border-2 border-cyan-700 rounded
            sm:grid sm:grid-cols-5 sm:grid-rows-5 sm:gap-1 sm:p-1" onClick={selectHeap}>
                {renderGridBlocks(blocks)}
            </div>
            <div className="relative sm:hidden sm:border-2 border-cyan-700 rounded h-16 w-16 z-10 grid grid-rows-5"
            onClick={selectHeap}>
                <p className='absolute top-0 left-1 text-sm z-10'>{blocks}</p>
                {renderRowBlocks(blocks)}
            </div>
            <div className={`${isSelected ? 'opacity-1' : 'opacity-0'} mt-1 h-0.5 sm:h-1 rounded bg-red-600`}></div>
        </div>
    )
}

export default HeapDisplay;
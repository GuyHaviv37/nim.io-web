import React, { ChangeEvent, useCallback, useEffect } from 'react';
import {MAX_HEAP_SIZE} from '../constants';

interface HeapInputProps {
    name: string;
    value: number;
    setValue: (newValue: number) => void;
    maxValue?: number;
}

const HeapInput: React.FC<HeapInputProps> = (props) => {
    const {name, value, setValue, maxValue} = props;
    const max = maxValue ?? MAX_HEAP_SIZE;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value);
        setValue(newValue)
    }, [setValue])

    useEffect(() => {
        if (value > max) {
            setValue(Math.max(1, max));
        } 
    }, [maxValue]);

    return (
    <div className="flex xl:h-8">
        <button className="bg-gray-100 px-1.5 rounded-l
        focus:outline-indigo-700 focus:outline-offset-0
        hover:bg-gray-200 hover:text-black
        xl:px-3" 
        onClick={() => setValue(Math.max(1, value - 1))}>
            <span className="m-auto font-thin">-</span>
        </button>        
        <input className="outline-none bg-gray-100 text-center w-8
        focus:outline-none" 
        type="number" min="1" max={max} 
        name={name} 
        value={value} onChange={onChangeHandler}/>
        <button className="px-1.5 bg-gray-100 rounded-r
        focus:outline-indigo-700 focus:outline-offset-0
        hover:bg-gray-200 hover:text-black
        xl:px-3"
        onClick={() => setValue(Math.min(max, value + 1))}>
            <span className="m-auto font-thin text-center">+</span>
        </button> 
    </div>
    )
}

export default HeapInput;

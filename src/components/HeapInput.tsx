import React, { ChangeEvent, useCallback } from 'react';

interface HeapInputProps {
    name: string;
    value: number;
    setValue: (newValue: number) => void;
}

const HeapInput: React.FC<HeapInputProps> = (props) => {
    const {name, value, setValue} = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value);
        setValue(newValue)
    }, [setValue])

    return (
    <div>
        <button className="bg-gray-100 px-1.5 rounded-l
        focus:outline-indigo-700 focus:outline-offset-0
        hover:bg-gray-200 hover:text-black" 
        onClick={() => setValue(Math.max(1, value - 1))}>
            <span className="m-auto font-thin">-</span>
        </button>        
        <input className="outline-none bg-gray-100 text-center h-6 w-8
        focus:outline-none" 
        type="number" min="1" max="25" 
        name={name} 
        value={value} onChange={onChangeHandler}/>
        <button className="px-1.5 bg-gray-100 rounded-r
        focus:outline-indigo-700 focus:outline-offset-0
        hover:bg-gray-200 hover:text-black"
        onClick={() => setValue(Math.min(25, value + 1))}>
            <span className="m-auto font-thin text-center">+</span>
        </button> 
    </div>
    )
}

export default HeapInput;

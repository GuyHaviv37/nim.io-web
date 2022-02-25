import React, { ChangeEventHandler } from 'react';

interface GameIdProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const GameIdInput: React.FC<GameIdProps> = (props) => {
    const {value, onChange} = props;
    return (
        <input className="rounded bg-gray-100 text-slate-800 placeholder:text-slate-400 px-2 w-40
        focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-1"
        type="text" placeholder="Game ID" value={value} onChange={onChange}/>
    )
};

export default GameIdInput;

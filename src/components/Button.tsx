import React from 'react';

interface ButtonProps {
    label: string;
    onPress?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({label, onPress, disabled}) => {
    return (
        <button disabled={disabled} className={`py-1 px-2 rounded tracking-wide text-sm text-gray-100  ${!disabled ? 'bg-indigo-500' : 'bg-slate-400'}
            shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-1
            ${!disabled ? 'hover:-translate-y-0.5 hover:bg-indigo-700 hover:text-white active:translate-y-0' : ''}
            lg:py-2 lg:px-4 lg:text-md lg:tracking-wide lg:shadow-lg
            xl:py-2.5 xl:px-5 xl:tracking-wider`}
            onClick={onPress}
        >
            {label}
        </button>
    )
}

export default Button;
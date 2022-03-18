import React from 'react';
import { NimError } from '../useErrors';
import {XCircleIcon} from '@heroicons/react/outline';

interface ErrorsFooterProps {
    errorsQueue: NimError[];
    removeFromQueue: (queue: NimError[], error: NimError) => void;
}

const ErrorsFooter: React.FC<ErrorsFooterProps> = (props) => {
    const {errorsQueue, removeFromQueue} = props;

    return (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2
        sm:bottom-10 md:bottom-24">
            <div className="flex flex-col justify-center">
                {errorsQueue.map((error) => {
                    return (
                        <div className="relative z-10 bg-red-400 border-2 border-red-500 rounded my-1 py-1 text-center text-sm italic animate-fadeLonger" key={error.timeoutId}>
                            <XCircleIcon
                            className="absolute -top-1 -left-2 w-5 h-5 bg-gray-300 rounded-[50%] text-gray-700 cursor-pointer
                            focus:outline-none" 
                            onClick={() => removeFromQueue(errorsQueue, error)}/>
                            <p className='p-2'>{error.msg}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default ErrorsFooter;

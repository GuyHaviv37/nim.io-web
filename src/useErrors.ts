import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type NimSocketError = {
    type: string;
    msg: string;
}

export type NimError = NimSocketError & {
    timeoutId: number;
}

enum NimErrors {
    INAVLID_HEAPS_SIZES = 'INAVLID_HEAPS_SIZES',
    FULL_ROOM = 'FULL_ROOM',
    ROOM_NOT_FOUND = 'ROOM_NOT_FOUND',
    USER_NOT_IN_ROOM = 'USER_NOT_IN_ROOM',
    NOT_ENOUGH_PLAYERS = 'NOT_ENOUGH_PLAYERS',
    NO_USER_FOUND = 'NO_USER_FOUND',
    USER_WITHOUT_ROOM = 'USER_WITHOUT_ROOM',
}

const ERROR_DISPLAY_TIME = 5000;

export const useErrors = () => {
    const [errorsQueue, setErrorsQueue] = useState<NimError[]>([])
    const navigate = useNavigate();

    const addToQueue = useCallback((error: NimSocketError) => {
        // I think I can avoid adding duplicate errors by type ?
        const timeoutId = setTimeout(() => {
            setErrorsQueue(queue => queue.slice(1));
        }, ERROR_DISPLAY_TIME)
        const wrappedError = {
            ...error,
            timeoutId,
        }
        setErrorsQueue(queue => [...queue, wrappedError]);
    }, [setErrorsQueue]);

    const removeFromQueue = useCallback((queue: NimError[], error: NimError) => {
        const newQueue = queue.filter(nimError => nimError.timeoutId !== error.timeoutId);
        setErrorsQueue(newQueue);
    }, [setErrorsQueue])

    const errorCallback = (error: NimSocketError) => {
        if (!error) return;
        const errorType = error.type;
        switch (errorType) {
            case NimErrors.INAVLID_HEAPS_SIZES:
            case NimErrors.FULL_ROOM:
            case NimErrors.ROOM_NOT_FOUND:
                console.error('useErrors: ', error.msg);
                addToQueue(error);
                navigate('/');
                break;
            case NimErrors.NO_USER_FOUND:
            case NimErrors.USER_NOT_IN_ROOM:
            case NimErrors.NOT_ENOUGH_PLAYERS:
            case NimErrors.NO_USER_FOUND:
            case NimErrors.USER_WITHOUT_ROOM:
                addToQueue(error);
                console.error('useErrors: ', error.msg);
            default:
                console.error('Unknown Error: ', error);
        }
    };
    
    return {errorCallback, errorsQueue, removeFromQueue};
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type NimSocketError = {
    type: string;
    msg: string;
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

export const useErrors = () => {
    const [errorsQueue, setErrorsQueue] = useState<NimSocketError[]>([])
    const navigate = useNavigate();
    const errorCallback = (e: NimSocketError) => {
        if (!e) return;
        const errorType = e.type;
        switch (errorType) {
            case NimErrors.INAVLID_HEAPS_SIZES:
                console.error('useErrors: ', e.msg);
                navigate('/');
                break;
            case NimErrors.NO_USER_FOUND:
                console.error('useErrors: ', e.msg);
                break;
        }
    };
    
    // "Reducer per error types"

    return {errorCallback, errorsQueue};
};

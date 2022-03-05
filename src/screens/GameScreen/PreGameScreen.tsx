import React, { useCallback, useState } from 'react';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import Button from '../../components/Button';

interface PreGameScreenProps {
    isPlayerReady: boolean;
    isOpponentReady: boolean;
    isOpponentConnected: string | null;
    toggleReady: () => void;
    inviteUrl: string;
}

const getSwitchStyles = (isReady: boolean) => {
    return isReady ? 'bg-indigo-400 flex flex-row-reverse' : 'bg-gray-200';
}

const PreGameScreen: React.FC<PreGameScreenProps> = (props) => {
    const {isPlayerReady, isOpponentReady, isOpponentConnected, toggleReady, inviteUrl} = props;
    const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

    const onInviteFriendPress = useCallback(() => {
        if (!showCopyToClipboard) {
            setShowCopyToClipboard(true);
            setTimeout(() => setShowCopyToClipboard(false), 4100);
        }
        navigator.clipboard.writeText(inviteUrl);
    }, [showCopyToClipboard, setShowCopyToClipboard]);
    
    return (
        <div>
            <div className="bg-indigo-200 rounded flex flex-col mx-auto items-center space-y-3 pt-3 pb-5 max-w-3xl">
                <h4 className='text-slate-800 text-lg tracking-wider font-semibold lg:text-xl xl:text-3xl'>Players are getting ready...</h4>
                <div className="grid grid-cols-2 grid-rows-2 place-items-center">
                    <p className="xl:text-lg">Opponent: </p>
                    {!!isOpponentConnected ? 
                    <div>
                        {isOpponentReady ? 
                        <CheckCircleIcon className='h-7 w-7 text-emerald-500 lg:h-8 lg:w-8'/> : 
                        <XCircleIcon className='h-7 w-7 text-rose-600 lg:h-8 lg:w-8'/>}
                    </div>
                    : <div className="animate-spin w-7 h-7 border-4 rounded-full border-r-transparent lg:h-8 lg:w-8"/> 
                    }
                    <p className="xl:text-lg">You: </p>
                    <div className={`h-5 w-11 rounded-lg shadow-sm ${getSwitchStyles(isPlayerReady)}`}>
                        <button
                            className="w-5 h-5 transfrom scale-105 rounded-full bg-white shadow-sm"
                            onClick={() => toggleReady()}
                        />
                    </div>
                </div>
            </div>
            {/* Invite */}
            {!isOpponentConnected &&
                <div className="mt-7 flex flex-col items-center">
                    <Button label={"Invite Friend"} onPress={onInviteFriendPress}/>
                    <p className={`opacity-0 text-center mt-3 px-2 py-1 text-slate-800 text-sm
                    lg:text-md
                    border-2 rounded-full border-slate-400 
                    ${showCopyToClipboard ? 'animate-fade': ''}`}>
                        Link to join was copied to your clipboard
                    </p>
                </div>
            }
        </div>
    )
}

export default React.memo(PreGameScreen);
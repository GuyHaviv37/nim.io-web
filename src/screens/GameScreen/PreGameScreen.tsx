import React, { useCallback, useState, useMemo } from 'react';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline';
import Button from '../../components/Button';
import { CLIENT } from '../../constants';

interface PreGameScreenProps {
    isPlayerReady: boolean;
    isOpponentReady: boolean;
    isOpponentConnected: string | null;
    toggleReady: () => void;
    gameId: string;
}

const getSwitchStyles = (isReady: boolean) => {
    return isReady ? 'bg-indigo-400 flex flex-row-reverse' : 'bg-gray-200';
}

const getShareableContent = (gameId: string) => ({
    title: 'Nim.io',
    text: 'Join me for a game of Nim.io !',
    url: `${CLIENT}/game/${gameId}/2`
})

const PreGameScreen: React.FC<PreGameScreenProps> = (props) => {
    const {isPlayerReady, isOpponentReady, isOpponentConnected, toggleReady, gameId} = props;
    const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
    const shareableInviteData = useMemo(() => getShareableContent(gameId), [gameId]);

    const onInviteFriendPress = useCallback(() => {
        
        if (navigator.canShare && navigator.canShare(shareableInviteData)) {
            navigator.share(shareableInviteData);
        } else {
            if (!showCopyToClipboard) {
                setShowCopyToClipboard(true);
                setTimeout(() => setShowCopyToClipboard(false), 2100);
            }
            navigator.clipboard.writeText(`Hey! join me for a game of Nim.io at ${shareableInviteData.url}`);
        }

    }, [showCopyToClipboard, setShowCopyToClipboard, shareableInviteData]);
    
    return (
        <div>
            <div className="bg-indigo-200 rounded flex flex-col mx-auto items-center space-y-3 pt-3 pb-5 max-w-3xl">
                <h4 className='text-slate-800 text-lg tracking-wider font-semibold lg:text-xl xl:text-3xl'>Players are getting ready...</h4>
                <p className="xl:text-lg text-center">Game ID: {gameId}</p>
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
                        Invite to join was copied to your clipboard
                    </p>
                </div>
            }
        </div>
    )
}

export default React.memo(PreGameScreen);

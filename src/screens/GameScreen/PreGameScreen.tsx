import React from 'react';

interface PreGameScreenProps {
    isPlayerReady: boolean;
    isOpponentReady: boolean;
    isOpponentConnected: string | null;
    toggleReady: () => void;
}

const getSwitchStyles = (isReady: boolean) => {
    return isReady ? 'bg-indigo-400 flex flex-row-reverse' : 'bg-gray-200';
}

const PreGameScreen: React.FC<PreGameScreenProps> = (props) => {
    const {isPlayerReady, isOpponentReady, isOpponentConnected, toggleReady} = props;
    console.log(props);
    return (
        <div>
            PreGameScreen
            {/* Invite */}
            {/* Ready selector and status */}
            {/* Pre-Game [toggleReady] */}
            <div className="bg-indigo-200 rounded flex flex-col items-center space-y-3 pt-3 pb-5">
                <h4 className='text-slate-800 text-lg tracking-wider font-semibold lg:text-xl xl:text-3xl'>Players are getting ready...</h4>
                <div className="grid grid-cols-2 grid-rows-2 place-items-center">
                    <p>Opponent: </p>
                    {!!isOpponentConnected ? 
                    <button onClick={() => console.log('toggleReady - player')}>{isPlayerReady ? 'X' : 'V'}</button>
                    : <p>No opponent connected</p>
                    }
                    <p>You: </p>
                    {/* <button onClick={() => console.log('toggleReady - player')}>{isPlayerReady ? 'X' : 'V'}</button> */}
                    <div className={`h-5 w-11 rounded-lg shadow-sm ${getSwitchStyles(isPlayerReady)}`}>
                        <button
                            className="w-5 h-5 transfrom scale-105 rounded-full bg-white shadow-sm"
                            onClick={() => toggleReady()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PreGameScreen);

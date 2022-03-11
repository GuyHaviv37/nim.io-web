import React, { useCallback, useState } from 'react';
import MenuCard from '../../components/MenuCard';
import HeapInput from '../../components/HeapInput';
import LinkButton from '../../components/LinkButton';
import GameIdInput from '../../components/GameIdInput';
import {v4 as uuidv4} from 'uuid';
import HowToPlay from '../../components/HowToPlay';

const generateUniqueId = () => {
    return uuidv4().substring(0,8);
}

const MainMenuScreen: React.FC = () => {
    const [heapA, setHeapA] = useState(1);
    const [heapB, setHeapB] = useState(1);
    const [heapC, setHeapC] = useState(1);
    const [gameId, setGameId] = useState('');
    const onGameIdChangeHandler = useCallback((e) => {
        setGameId(e.target.value);
    }, [setGameId]);

    return (
        <main className="pt-5">
            <h2 className='font-semibold text-4xl text-center tracking-wide text-indigo-500'>Nim.io</h2>
            <div className="mt-9 px-10">
                <div className="grid grid-rows-2 space-y-3 sm:grid-rows-1 sm:grid-cols-2 sm:space-x-2 sm:space-y-0 md:space-x-3">
                    <MenuCard
                        title="Create Game"
                        subtitle="Choose heap sizes:"
                        icon="pencil"
                    >
                        <div className="flex space-x-3 mb-10 xl:space-x-5">
                            <HeapInput name="heapA" value={heapA} setValue={setHeapA}/>
                            <HeapInput name="heapB" value={heapB} setValue={setHeapB}/>
                            <HeapInput name="heapC" value={heapC} setValue={setHeapC}/>
                        </div>
                        <LinkButton label="Create" pathname={`/game/${generateUniqueId()}/1`} state={{heaps: [heapA, heapB, heapC]}}/>
                    </MenuCard>
                    <MenuCard
                        title="Join Game"
                        subtitle="Enter game id:"
                        icon="globe"
                    >
                        <GameIdInput value={gameId} onChange={onGameIdChangeHandler}/>
                        <LinkButton label="Join" pathname={gameId ? `/game/${gameId}/2` : '/'}/>
                    </MenuCard>
                </div>
            </div>
            <HowToPlay/>
        </main>
    )
}

export default React.memo(MainMenuScreen);

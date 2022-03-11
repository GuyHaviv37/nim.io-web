import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid'

const HowToPlay = () => {
    const [showContent, setShowContent] = useState(false);
    const showContentHandler = () => {
        setShowContent(prevValue => !prevValue);
    };

    return (
        <div className="flex flex-col bg-gray-100 py-5 px-10 text-center">
            <div className="flex items-center justify-center space-x-4 cursor-pointer" onClick={showContentHandler}>
                <ChevronRightIcon className={`w-6 h-6 transform ${showContent ? 'rotate-90' : 'rotate-0'}`} />
                <h5 className="text-lg font-semibold tracking-wide xl:text-xl">How To Play ?</h5>
            </div>
            {showContent && <ul className="px-10 pt-2 text-sm text-left md:text-center md:text-base md:font-thin xl:text-lg">
                <li><a className="underline text-blue-600 font-semibold" href="https://en.wikipedia.org/wiki/Nim" target="_blank">Nim</a> is a 2-player, turn-based, mathematical game of strategy.</li>
                <li>The game starts with 3 heaps with some number of blocks (1-25).</li>
                <li>Each player, in his turn, selects to remove some blocks.</li>
                <li>He must remove <strong>at least one block</strong> at his turn, from a <strong>single</strong> heap.</li>
                <li>The player which removes the <strong>LAST</strong> block in all of the heaps - wins the game !</li>
            </ul>}
        </div>
    )
}

export default React.memo(HowToPlay);

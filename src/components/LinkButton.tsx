import React from 'react';
import {Link} from 'react-router-dom';

interface LinkButtonProps {
    label: string;
    pathname: string;
    state?: object;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
    const {label, pathname, state} = props;
    return (
        <Link to={pathname} state={state} className="outline-none focus:outline-none">
            <button className='py-1 px-2 rounded tracking-wide text-sm text-gray-100  bg-indigo-500
            shadow-md transform transition focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-1
            hover:-translate-y-0.5 hover:bg-indigo-700 hover:text-white
            active:translate-y-0
            lg:py-2 lg:px-4 lg:text-md lg:tracking-wide lg:shadow-lg
            xl:py-2.5 xl:px-5 xl:tracking-wider' 
            >
                {label}
            </button>
        </Link>
    )
}

export default LinkButton;

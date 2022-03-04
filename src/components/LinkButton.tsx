import React from 'react';
import {Link} from 'react-router-dom';
import Button from './Button';

interface LinkButtonProps {
    label: string;
    pathname: string;
    state?: object;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
    const {label, pathname, state} = props;
    return (
        <Link to={pathname} state={state} className="outline-none focus:outline-none">
            <Button label={label}/>
        </Link>
    )
}

export default LinkButton;

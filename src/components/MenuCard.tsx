import React from 'react';
import {PencilIcon, GlobeAltIcon} from '@heroicons/react/outline';

interface MenuCardProps {
    icon: string;
    title: string;
    subtitle: string;
}

const iconStyles = "h-20 w-20 text-slate-800"

const renderIcon = (iconName: string) => {
    if (iconName === 'pencil') {
        return (
            <PencilIcon className='h-20 w-20 text-slate-800'/>
        )
    } else if (iconName === 'globe') {
        return (
            <GlobeAltIcon className={iconStyles}/>
        )
    }
}

const MenuCard: React.FC<MenuCardProps> = (props) => {
    const { title, subtitle, icon, children} = props;
    return (
        <div className="bg-indigo-200 rounded flex flex-col items-center space-y-3 pt-3 pb-5">
            {renderIcon(icon)}
            <h2 className='text-slate-800 text-2xl tracking-wider font-semibold'>{title}</h2>
            <h6 className='text-slate-800 text-md'>{subtitle}</h6>
            {children}
        </div>
    )
}

export default MenuCard;
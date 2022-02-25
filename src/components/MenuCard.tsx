import React from 'react';
import {PencilIcon, GlobeAltIcon} from '@heroicons/react/outline';

interface MenuCardProps {
    icon: string;
    title: string;
    subtitle: string;
}

const iconStyles = "h-20 w-20 text-slate-800 xl:h-28 xl:w-28"

const renderIcon = (iconName: string) => {
    if (iconName === 'pencil') {
        return (
            <PencilIcon className='h-20 w-20 text-slate-800 xl:h-28 xl:w-28'/>
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
        <div className="bg-indigo-200 rounded flex flex-col items-center space-y-3 pt-3 pb-5
        lg:max-w-lg lg:justify-self-center lg:w-full xl:max-w-3xl">
            {renderIcon(icon)}
            <h2 className='text-slate-800 text-2xl tracking-wider font-semibold lg:text-3xl xl:text-4xl'>{title}</h2>
            <h6 className='text-slate-800 text-md lg:text-lg xl:text-xl'>{subtitle}</h6>
            {children}
        </div>
    )
}

export default MenuCard;
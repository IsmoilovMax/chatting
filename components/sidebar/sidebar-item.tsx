import { LucideIcon } from 'lucide-react'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { IconType } from 'react-icons';

type IconComponent = LucideIcon | IconType;

interface Props {
    label: string
    icon: IconComponent
    notification?: boolean
}

const SidebarItem = ({ icon: Icon, label, notification }: Props) => {
    return (
        <div className='flex flex-row items-center'>
            {/**Mobile sidebar item */}
            <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden'>
                <Icon size={28} />
            </div>

            {/**Descktop sidebar item */}
            <div className='relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center'>
                <Icon size={24} />
                <p className='hidden lg:block text-xl text-white'>{label}</p>
                {notification ? (
                    <BsDot className={"text-sky-500 absolute -top-4 left-0"} size={70} />
                ) : null}
            </div>
        </div>
    )
}

export default SidebarItem

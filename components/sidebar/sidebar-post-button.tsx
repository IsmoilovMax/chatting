import { Feather } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function SidebarPostButton() {
    return (
        <Link href={'/'}>
            {/**Mobile post */}
            <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 
            hover:bg-opacity-80 transition cursor-pointer'>
                <Feather size={22} />
            </div>

            {/**Desktop post */}
            <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover: bg-opacity-90 cursor-pointer'>
                <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>
                    Post
                </p>
            </div>
        </Link>
    )
}

export default SidebarPostButton

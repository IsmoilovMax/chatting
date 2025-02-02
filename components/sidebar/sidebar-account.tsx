"use client"

import { IUser } from '@/types'
import { Popover } from '@radix-ui/react-popover'
import { signOut, useSession } from 'next-auth/react'
import { RiLogoutCircleLine } from "react-icons/ri"
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { Loader2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '../ui/avatar'

interface Props {
    user: IUser
}

function SidebarAccount({ user }: Props) {
    const { data, status }: any = useSession()

    if (status === "loading")
        return (
            <div className='flex items-center justify-center'>
                <Loader2 className='animate-spin text-sky-500' />
            </div>)

    return (
        <>
            {/**Mobile sidebar account */}
            <div className='lg:hidden block'>
                <div
                    className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex
                    items-center bg-red-500 hover:bg-opacity-80
                    transition cursor-pointer
                    '
                    onClick={() => signOut()}
                >
                    <RiLogoutCircleLine size={24} />
                </div>
            </div>

            {/**Desktop sidebar account */}
            <Popover>
                <PopoverTrigger className='w-full rounded-full hover:bg-slate-300
                    hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition
                '>
                    <div className='flex justify-between items-center gap-2'>
                        <div className='flex gap-2 items-center'>
                            <Avatar>
                                <AvatarImage src={data?.currentUser?.profileImage} style={{ width: "55px" }} />
                                <AvatarFallback>{data?.currentUser?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col items-start'>
                                <p>{data?.currentUser?.name}</p>
                                {data?.currentUser?.username ? (
                                    <p className='opacity-40'>@{data?.currentUser?.username}</p>
                                ) : (
                                    <p className='opacity-40'>Manage account</p>
                                )}
                            </div>
                        </div>
                        <MoreHorizontal size={24} />
                    </div>
                </PopoverTrigger>
                <PopoverContent className='bg-black border-none rounded-2xl shadow shadow-white px-0 mb-3'>
                    <div
                        className='font-bold cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 p-4 transition' onClick={() => signOut()}
                    >
                        Log out{" "} {data?.currentUser?.username ? `@${data?.currentUser?.username}` : data?.currentUser?.name}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default SidebarAccount

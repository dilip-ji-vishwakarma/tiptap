import React from 'react'
import { Comment, FontChanger, HistoryList, Legend, Share } from '../core'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '../context/UserContext';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export const ButtonAction = () => {
    const { user, loading } = useUser();
    if (loading) return <p>Loading...</p>;

    if (!user) return <p>User not logged in. Please log in.</p>;

    return (
        <>
            <div className='lg:block hidden'>
                <FontChanger />
            </div>
            <Legend />
            <HistoryList />
            <Comment />
            <Share />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Avatar className='lg:block hidden'>
                            <AvatarImage src="https://github.com/shadcn.png" className="w-10 h-10 min-w-[40px] p-[3px] rounded-[100%] border-2 border-solid border-[rgba(112,100,233,0.3019607843)]" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{user.fullname}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

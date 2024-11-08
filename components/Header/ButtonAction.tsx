import React from 'react'
import { Comment, Share } from '../core'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  History } from 'lucide-react';

export const ButtonAction = () => {

    return (
        <>
            <History />
            <Comment />
           <Share />
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" className="w-10 h-10 min-w-[40px] p-[3px] rounded-[100%] border-2 border-solid border-[rgba(112,100,233,0.3019607843)]" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </>
    )
}

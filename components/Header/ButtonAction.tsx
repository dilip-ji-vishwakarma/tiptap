import React from 'react'
import { Comment } from '../core'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LockKeyhole, History } from 'lucide-react';

export const ButtonAction = () => {
    return (
        <>
            <History />
            <Comment />
            <Button variant="outline" className="flex gap-3 items-center rounded-full bg-[#C2E7FF] border border-solid border-[#C2E7FF]"><LockKeyhole /> Share</Button>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" className="w-10 h-10 min-w-[40px] p-[3px] rounded-[100%] border-2 border-solid border-[rgba(112,100,233,0.3019607843)]" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </>
    )
}

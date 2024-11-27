import React from 'react'
import { Comment, FontChanger, HistoryList, Legend, Share } from '../core'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '../context/UserContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

export const ButtonAction = () => {
    const router = useRouter()
    const { user, loading } = useUser();
    if (loading) return <p>Loading...</p>;

    if (!user) return <p>User not logged in. Please log in.</p>;

    // Get first letter of first name and surname from fullname
    const nameParts = user.fullname.split(' ');
    const firstNameInitial = nameParts[0]?.[0]?.toUpperCase() || '';  
    const surnameInitial = nameParts[1]?.[0]?.toUpperCase() || '';  

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('');
      };

    return (
        <>
            <div className='lg:block hidden'>
                <FontChanger />
            </div>
            <Legend />
            <HistoryList />
            <Comment />
            <Share />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className='lg:block hidden'>
                        <AvatarFallback className='bg-[#EDF2FA] rounded-[50%]'>
                            {firstNameInitial}{surnameInitial}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white'>
                    <DropdownMenuLabel className='text-lg'>{user.fullname}</DropdownMenuLabel>
                    <DropdownMenuItem className='text-md py-0'>{user.email}</DropdownMenuItem>
                    <DropdownMenuItem  onClick={handleLogout} className='border cursor-pointer text-md font-medium h-10   px-6 py-2 rounded-md leading-[0px] border-[#0b57d0] text-[#0b57d0] justify-center mx-[9px] my-[13px] hover:bg-[#0b57d0] hover:text-white'>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

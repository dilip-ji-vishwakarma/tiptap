"use client"
import Link from "next/link"
import { GlobalSearchbar } from "../GlobalSearchbar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/context/UserContext";
import Image from "next/image";

export const DashboardHeader = () => {

    const router = useRouter();
    const { user, loading } = useUser();

    if (loading) return <p>Loading...</p>;

    if (!user) return <p>User not logged in. Please log in.</p>;

    const nameParts = user.fullname.split(" ");
    const firstNameInitial = nameParts[0]?.[0]?.toUpperCase() || "";
    const surnameInitial = nameParts[1]?.[0]?.toUpperCase() || "";

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div className="bg-white shadow-sm">
        <div className="container mx-auto ">
            <header className="flex  shrink-0 items-center px-4 py-3 gap-10 ">
                <div className="w-[30%]">
                    <Image src="/images/skilline.png" width={1331} height={182} alt="logo" className="w-[60%]" />
                </div>
                <div className="w-[55%]">
                    <GlobalSearchbar />
                </div>
                <div className="flex gap-2 w-[15%] justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="lg:block hidden">
                                <AvatarFallback className="bg-[#EDF2FA] rounded-[50%]">
                                    {firstNameInitial}
                                    {surnameInitial}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            <DropdownMenuLabel className="text-lg">{user.fullname}</DropdownMenuLabel>
                            <DropdownMenuItem className="text-md py-0">{user.email}</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="border cursor-pointer text-md font-medium h-10 px-6 py-2 rounded-md leading-[0px] border-[#0b57d0] text-[#0b57d0] justify-center mx-[9px] my-[13px] hover:bg-[#0b57d0] hover:text-white"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
        </div>
    )
}


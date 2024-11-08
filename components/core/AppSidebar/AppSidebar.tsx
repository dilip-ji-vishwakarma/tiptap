"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { MenuMaker } from "./MenuMaker";
import { useEffect, useState } from "react";
import { ListMinus } from 'lucide-react';
import Link from "next/link";

// Define types for main menu item and submenu item
interface SubmenuItem {
    id: number;
    step_id: number;
    label: string;
    url: string;
}

interface TutorialItem {
    id: number;
    label: string;
    url: string;
    submenu?: SubmenuItem[];
}

export const AppSidebar = () => {
    const [tutorials, setTutorials] = useState<TutorialItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>({}); 

    useEffect(() => {
        fetch('/api/tutorials')
            .then((response) => response.json())
            .then((data) => {
                setTutorials(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching tutorials:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    // Toggle submenu open/close
    const handleSubmenuToggle = (id: number) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the submenu open state
        }));
    };

    return (
        <div className="relative">
            <Sidebar className="mt-[109px] border-none p-3">
                <SidebarContent className="bg-[#F9FBFD]">
                    <SidebarGroup>
                        <div className="fixed left-0">
                            <SidebarTrigger size="lg" />
                        </div>
                        <div className="mt-[60px]">
                            <SidebarGroupLabel className="flex items-center justify-between text-[#444746] text-md font-light leading-5">
                                <span>Document Tabs</span>
                                <MenuMaker />
                            </SidebarGroupLabel>
                            <SidebarGroupContent className="mt-3 ">
                                <SidebarMenu className="px-1 ">
                                    {tutorials.map((item, index) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton
                                                asChild
                                                className="bg-[#D3E3FD] rounded-full mb-2 text-base font-medium h-[41px] p-[15px]"
                                                onClick={() => handleSubmenuToggle(item.id)} // Toggle on parent click
                                            >
                                                <Link href={item.url}>
                                                    <ListMinus />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                            {item.submenu && item.submenu.length > 0 && (
                                                <SidebarMenu
                                                    className={`ml-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                                                        openSubmenus[item.id] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                                >
                                                    {item.submenu.map((submenuItem: SubmenuItem) => (
                                                        <SidebarMenuItem key={submenuItem.id}>
                                                            <SidebarMenuButton asChild>
                                                                <a href={submenuItem.url}>
                                                                    <span>{submenuItem.label}</span>
                                                                </a>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            )}
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </div>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    );
};

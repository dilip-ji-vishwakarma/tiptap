"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import Image from "next/image"
import { LayoutGrid } from 'lucide-react';
import { ButtonAction } from "./ButtonAction"
import { Comment, Share } from "../core"

export const Header = () => {

    const navigationmenu = [
        {
            label: "Courses",
            href: "/courses",
        },
        {
            label: "My Account",
            href: "/my-account",
        },
        {
            label: "Subscription",
            href: "/subscription",
        },
        {
            label: "Help",
            href: "/help",
        },
        {
            label: "Contact",
            href: "/contact",
        }
    ]

    return (
        <div className="containers mx-auto ">
            <header className="flex w-full shrink-0 items-center pt-5">
                <Sheet>
                    <SheetTrigger asChild >
                        <Button variant="outline" size="icon" className="lg:hidden ">
                            <LayoutGrid />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-[whitesmoke]">
                        <Link href="#" prefetch={false} className="w-[70%] flex">
                            <Image src="/images/skilline.png" width={1331} height={182} alt="logo" />
                        </Link>
                        <div className="grid gap-2 py-6">
                            {navigationmenu.map((item, index) => (
                                <Link key={index} href={item.href} className="flex w-full items-center  text-lg " prefetch={false}>{item.label}</Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="#" className="mr-6 hidden lg:flex w-[10%]" prefetch={false} >
                    <Image src="/images/skilline.png" width={1331} height={182} alt="logo" />
                </Link>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        {navigationmenu.map((item, index) => (
                            <NavigationMenuLink asChild key={index}>
                                <Link
                                    href={item.href}
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4  text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                    prefetch={false}
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="ml-auto flex gap-6 items-center">
                    <ButtonAction />
                </div>
            </header>
        </div>
    )
}

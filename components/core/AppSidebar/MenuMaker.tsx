"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputText } from '../InputText';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Plus, X } from 'lucide-react';


export const MenuMaker = () => {
    // Initialize with one submenu item
    const [submenus, setSubmenus] = useState<string[]>(['submenu-1']);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data:any) => {
        console.log(data);
        reset();
        setSubmenus(['submenu-1']);  // Reset submenus to only include the initial one after submission if needed
    }

    const addSubmenu = () => {
        setSubmenus([...submenus, `submenu-${submenus.length + 1}`]);
    }

    const removeSubmenu = (index: number) => {
        // Only allow removal if it's not the first submenu
        if (index > 0) {
            setSubmenus(submenus.filter((_, i) => i !== index));
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="cursor-pointer">
                    <Plus width={18} height={18} />
                </span>
            </DialogTrigger>
            <DialogContent className='bg-white z-[9999]'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Create Menu</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-5 mt-3'>
                        <InputText column_name='parent-menu' label='Tab Name' control={control} errors={errors} required={true} />

                        {/* Button to add a submenu */}
                        <div onClick={addSubmenu} className='flex items-center gap-3 border w-[30%] justify-center p-[5px] rounded-[23px] border-dotted border-gray-500 text-gray-500 text-sm cursor-pointer'>
                            <span><Plus width={18} height={18} /></span>
                            <span>Add Sub Menu</span>
                        </div>

                        {/* Render dynamically added submenus with Name and URL inputs */}
                        {submenus.map((submenu, index) => (
                            <div key={submenu} className='flex items-center gap-3 w-full relative'>
                                {/* Submenu Name Input */}
                                <InputText
                                    column_name={`${submenu}-name`}
                                    label={`Submenu Name`}
                                    control={control}
                                    errors={errors}
                                    required={true}
                                />
                                <InputText
                                    column_name={`${submenu}-url`}
                                    label={`Submenu URL`}
                                    control={control}
                                    errors={errors}
                                    required={true}
                                />
                                {index > 0 && (
                                    <div>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger><button
                                                    type="button"
                                                    onClick={() => removeSubmenu(index)}
                                                    className="text-red-500 hover:text-red-700 absolute right-2.5 border rounded-[50%] border-solid border-[#b9b3b3] top-0 p-1"
                                                >
                                                    <X width={15} height={15} />
                                                </button></TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Remove Field</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <DialogFooter className='mt-3'>
                        <button type='submit' className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>Save</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

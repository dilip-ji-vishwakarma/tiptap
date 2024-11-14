"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { InputText } from '../input/InputText';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X } from 'lucide-react';


export const MenuMaker = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data:any) => {
        console.log(data);
        reset();
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
                    </div>
                    <DialogFooter className='mt-3'>
                        <button type='submit' className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>Save</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

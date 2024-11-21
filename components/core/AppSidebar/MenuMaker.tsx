"use client"
import React, { useState } from 'react';
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
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MenuMaker = () => {
    const [open, setOpen] = useState(false); 
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        reset();
        setOpen(false); 
    }

    const onClose = () => {
        setOpen(false); 
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                        <InputText column_name="label" placeholder="Enter Tab Name" required={true} control={control} errors={errors} label="Tab Name" />
                        <InputText column_name="url" placeholder="Enter Url" required={true} control={control} errors={errors} label="Url" />
                    </div>
                    <DialogFooter className="mt-5">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

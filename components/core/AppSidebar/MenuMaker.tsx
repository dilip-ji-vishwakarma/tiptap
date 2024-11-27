"use client";
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
import { useUser } from '@/components/context/UserContext';

export const MenuMaker = () => {
    const { user } = useUser();

    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        setIsSubmitting(true); 
        const labelFormatted = data.label.replace(/\s+/g, '-'); 
        const finalUrl = `/course?id=${labelFormatted}`;

        try {
            const response = await fetch('/api/tutorialmaking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user?.id,
                    label: data.label,
                    url: finalUrl, 
                    template: "tiptap-editor",
                    editor_string: '{}',
                    bookmark: false, 
                }),
            });

            if (response.ok) {
                reset();
                setOpen(false); 
                window.location.reload(); 
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false); 
        }
    };

    const onClose = () => {
        setOpen(false);
    };

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
                    </div>
                    <DialogFooter className="mt-5">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

type DeleteTabProps = {
    id: number;
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteCategory = ({ id, isOpen, onClose }: DeleteTabProps) => {
    const { handleSubmit, reset } = useForm({
        mode: "onChange",
    });

    const searchParams = useSearchParams();
    const categoryId = searchParams.get("category_id");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDelete = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication token is missing");
            }

            const response = await fetch('/api/patchcategory', {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    action: "delete",
                    category_id: id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete the category");
            }

            onClose(); 
            window.location.reload(); 
        } catch (error) {
            console.error('Error renaming category:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the item and remove all associated data.
                    </DialogDescription>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <DialogFooter>
                    <Button type="button" onClick={onClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit(onDelete)} disabled={isLoading}>
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
    const router = useRouter();
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

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Failed to delete the category");
            }

            // Instead of window.location.reload(), use router for better UX
            onClose();
            router.push("/"); // Redirect to home or categories page
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unexpected error occurred";
            
            setError(errorMessage);
            console.error('Error deleting category:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset form and close dialog
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the item and remove all associated data.
                    </DialogDescription>
                </DialogHeader>
                
                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                <DialogFooter>
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="destructive"
                        onClick={handleSubmit(onDelete)} 
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteTabProps = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteTab = ({ id, isOpen, onClose }: DeleteTabProps) => {
  const { handleSubmit, reset } = useForm({
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/tutorials/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      window.location.reload();
      reset();
      onClose();
    } catch (err) {
      setError("An error occurred while deleting the item.");
    } finally {
      setIsLoading(false);
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

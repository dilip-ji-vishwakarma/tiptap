"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { InputText } from "@/components/core";

type RenameTabProps = {
  id: number;
  label: string;
  isOpen: boolean;
  onClose: () => void;
};

export const RenameCategory = ({ id, label, isOpen, onClose }: RenameTabProps) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    mode: "onChange",
  });

  const handleForm = async (data: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        return;
      }
  
      const response = await fetch('/api/patchcategory', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'rename',
          category_id: id,
          category_name: data.label,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message || 'Failed to rename category');
        return;
      }
  
      onClose();
      window.location.reload(); 
      console.log('Category renamed successfully');
    } catch (error) {
      console.error('Error renaming category:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogContent className="bg-white">
        <form onSubmit={handleSubmit(handleForm)} className="space-y-3">
          <InputText column_name="label" placeholder="Rename Tab" defaultValue={label} required={true} control={control} errors={errors} label="Enter Tab Name" />
          <DialogFooter className="mt-5">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      </DialogHeader>
    </Dialog>
  );
};

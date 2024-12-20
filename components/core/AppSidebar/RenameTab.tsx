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
import { InputText } from "../input";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

type RenameTabProps = {
  id: number;
  label: string;
  isOpen: boolean;
  onClose: () => void;
};

export const RenameTab = ({ id, label, isOpen, onClose }: RenameTabProps) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    mode: "onChange",
  });
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");

  const handleForm = async (data: any) => {
    try {
      const payload: any = { label: data.label };
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/petchcourses?category_id=${categoryId}&id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to rename tab");
      }

      window.location.reload();
      onClose(); 
    } catch (error) {
      console.error("Error renaming tab:", error);
      alert("Failed to rename the tab. Please try again.");
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

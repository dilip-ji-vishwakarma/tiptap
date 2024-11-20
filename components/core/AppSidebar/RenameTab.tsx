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

type RenameTabProps = {
  id: number;
  label: string;
  url: string;
  isOpen: boolean;
  onClose: () => void;
};

export const RenameTab = ({ id, label, isOpen, onClose, url }: RenameTabProps) => {
  const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
    mode: "onChange",
  });

  const handleForm = async (data: any) => {
    try {
      const payload: any = { label: data.label };
      if (data.url) {
        payload.url = data.url;
      }
  
      const response = await fetch(`/api/tutorials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to rename tab");
      }
  
      console.log("Tab renamed successfully:", await response.json());
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
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogContent className="bg-white">
        <form onSubmit={handleSubmit(handleForm)} className="space-y-3">
          <InputText column_name="label" placeholder="Rename Tab" defaultValue={label} required={true} control={control} errors={errors} label="Enter Tab Name" />
          <InputText column_name="url" placeholder="Rename Url" defaultValue={url} required={true} control={control} errors={errors} label="Enter Url" />
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

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type GlobalSearchbarProps = {
  data: any[];
  onSearch: (filteredData: any[]) => void;
};

export const GlobalSearchbar = ({ data, onSearch }: GlobalSearchbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Show full data if search term is empty
    if (term.trim() === "") {
      onSearch(data); // Reset to full data
      return;
    }

    // Filter data based on the search term
    const filteredData = data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(term)
    );

    onSearch(filteredData);
  };

  return (
    <div className="relative flex items-center rounded-full bg-[#F0F4F9] h-[60px]">
      <Input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full rounded-lg bg-background px-5 items-center border-none shadow-none"
      />
      <div className="h-6 border-l border-solid border-black"></div>
      <Button variant="ghost" size="icon" className="rounded-full px-10">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

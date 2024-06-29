"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface FilterProps {
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSearchChange, onRegionChange }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchChange(search);
  };

  const handleRegionChange = (value: string) => {
    onRegionChange(value);
  }

  return (
    <div className="w-full px-16 flex justify-center mt-10">
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-white dark:bg-darkblue py-3 px-6 rounded-lg shadow-md">
          <Image src="/icons/search.svg" alt="search" width={15} height={15} />
          <input type="text" placeholder="Search for a country" className="bg-transparent border-none outline-none w-[28rem] text-darktext dark:text-white placeholder:text-darktext placeholder:dark:text-white" onChange={handleChange} />
        </form>

        <Select onValueChange={handleRegionChange}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-darkblue border-none shadow-md rounded-lg text-base">
            <SelectValue placeholder="Filter by Region" className="text-darktext dark:text-white" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-darkblue">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Africa">Africa</SelectItem>
            <SelectItem value="America">America</SelectItem>
            <SelectItem value="Asia">Asia</SelectItem>
            <SelectItem value="Europe">Europe</SelectItem>
            <SelectItem value="Oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>

      </div>
    </div>
  );
};

export default Filter;

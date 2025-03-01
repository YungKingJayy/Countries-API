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
    <div className="mt-10 flex w-full justify-center">
      <div className="flex w-full max-w-[1440px] flex-col justify-between gap-12 md:flex-row md:items-center">
        <form onSubmit={handleSubmit} className="flex items-center gap-4 rounded-lg bg-white px-6 py-3 shadow-md dark:bg-darkblue">
          <Image src="/icons/search.svg" alt="search" width={15} height={15} />
          <input type="text" placeholder="Search for a country" className="w-full border-none bg-transparent text-darktext outline-none placeholder:text-darktext dark:text-white placeholder:dark:text-white md:w-[28rem]" onChange={handleChange} />
        </form>

        <Select onValueChange={handleRegionChange}>
          <SelectTrigger className="w-[180px] rounded-lg border-none bg-white text-base shadow-md dark:bg-darkblue">
            <SelectValue placeholder="Filter by Region" className="text-darktext dark:text-white" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-darkblue">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Africa">Africa</SelectItem>
            <SelectItem value="Americas">Americas</SelectItem>
            <SelectItem value="Asia">Asia</SelectItem>
            <SelectItem value="Europe">Europe</SelectItem>
            <SelectItem value="Oceania">Oceania</SelectItem>
            <SelectItem value="Antarctic">Antarctic</SelectItem>
          </SelectContent>
        </Select>

      </div>
    </div>
  );
};

export default Filter;

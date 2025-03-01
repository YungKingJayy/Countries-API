"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

const Navbar = () => {
  const [currentTheme, setCurrentTheme] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (currentTheme === "light") {
      setTheme("dark");
      setCurrentTheme("dark");
    } else {
      setTheme("light");
      setCurrentTheme("light");
    }
  };

  return (
    <nav className="flex w-full items-center justify-center bg-white px-4 py-6 shadow-sm dark:bg-darkblue md:px-16">
      <div className="flex w-full max-w-[1440px] items-center justify-between">
        <h1 className="text-base font-extrabold text-darktext dark:text-white md:text-xl lg:text-2xl">Where in the world?</h1>
        <Button className="flex items-center gap-1 bg-transparent !p-0 hover:bg-transparent md:gap-3" onClick={toggleTheme}>
          <Image
            src={currentTheme === "light" ? "icons/moon-solid.svg" : "icons/moon-regular.svg"}
            alt=""
            width={15}
            height={15}
            className="h-3 w-3 md:h-4 md:w-4"
          />
          <p className="text-sx font-semibold text-darktext dark:text-white md:text-base">
            {currentTheme === "light" ? "Dark Mode" : "Light Mode"}
          </p>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

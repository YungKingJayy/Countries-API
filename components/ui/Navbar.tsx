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
    <nav className="w-full flex items-center justify-center py-6 px-16 bg-white dark:bg-darkblue">
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        <h1 className="text-darktext dark:text-white text-2xl font-extrabold">Where in the world?</h1>
        <Button className="flex items-center gap-3 bg-transparent hover:bg-transparent" onClick={toggleTheme}>
          <Image
            src={currentTheme === "light" ? "icons/moon-solid.svg" : "icons/moon-regular.svg"}
            alt=""
            width={15}
            height={15}
          />
          <p className="text-base font-semibold text-darktext dark:text-white">
            {currentTheme === "light" ? "Dark Mode" : "Light Mode"}
          </p>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

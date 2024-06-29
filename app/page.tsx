"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Countries from "@/components/Countries";
import Filter from "@/components/Filter";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    const url = search ? `https://restcountries.com/v3.1/name/${search}` : "https://restcountries.com/v3.1/all";

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No countries found");
        }
        return res.json();
      })
      .then((data) => {
        if (region !== "all") {
          data = data.filter((country: { region: string; }) => country.region === region);
        }
        setCountries(data);
        console.log(data);
        
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setCountries([])
        setError(err.message);
      });
  }, [search, region]);


  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Filter onSearchChange={handleSearchChange} onRegionChange={handleRegionChange} />
      {error ? (
        <div className="px-16 py-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <Countries countries={countries} />
      )}
    </main>
  );
}

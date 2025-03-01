"use client";

import React, { useState, useEffect, useMemo } from "react";
import Countries from "@/components/Countries";
import Filter from "@/components/Filter";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state added

  useEffect(() => {
    setLoading(true); // Start loading before fetching data
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCountries(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setCountries([]);
        setError(err.message);
      })
      .finally(() => setLoading(false)); // Stop loading when request completes
  }, []);

  // Memoized search and filter logic
  const filteredCountries = useMemo(() => {
    return countries.filter((country: { region: string; name: { common: string } }) => {
      const matchesRegion = region === "all" || country.region === region;
      const matchesSearch = search === "" || country.name.common.toLowerCase().includes(search.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [countries, search, region]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Filter onSearchChange={setSearch} onRegionChange={setRegion} />

      {loading ? (
        <div className="px-16 py-10">
          <p className="animate-pulse text-gray-500">Loading countries...</p>
        </div>
      ) : error ? (
        <div className="px-16 py-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : filteredCountries.length === 0 ? (
        <div className="px-16 py-10">
          <p className="text-gray-500">No countries found matching your criteria.</p>
        </div>
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  capital: string[];
  region: string;
  population: number;
}

interface CountriesProps {
  countries: Country[];
}

const Countries: React.FC<CountriesProps> = ({countries }) => {
  return (
    <div className="py-10">
      <div className="grid max-w-[1440px] grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((country: any) => {
          const { name, flags, capital, region, population } = country;
          return (
            <Link href={`/country?name=${name.common}`} className="flex h-[370px] flex-col rounded-md bg-white shadow-lg dark:bg-darkblue" key={name.common}>
              <div className="basis-1/2 overflow-hidden rounded-t-md shadow-sm">
                <img src={flags.svg} alt={name.common} className="h-full w-full object-cover" />
              </div>
              <div className="basis-1/2 px-6 pt-7">
                <h2 className="mb-4 text-lg font-bold">{name.common}</h2>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Population: <span className="font-extralight">{population.toLocaleString()}</span></p>
                  <p className="text-sm font-medium">Region: <span className="font-extralight">{region}</span></p>
                  <p className="text-sm font-medium">Capital: <span className="font-extralight">{capital ? capital[0] : "N/A"}</span></p>
                </div>
              </div>
            </Link>
          );
        })} 
      </div>
    </div>
  );
}

export default Countries;

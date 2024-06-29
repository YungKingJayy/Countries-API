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
    <div className="px-16 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 max-w-[1440px]">
        {countries.map((country: any) => {
          const { name, flags, capital, region, population } = country;
          return (
            <Link href={`/country?name=${name.common}`} className="flex flex-col rounded-md shadow-lg bg-white dark:bg-darkblue h-[370px]" key={name.common}>
              <div className="rounded-t-md basis-1/2 overflow-hidden shadow-sm">
                <img src={flags.svg} alt={name.common} className="object-cover w-full h-full" />
              </div>
              <div className="basis-1/2 px-6 pt-7">
                <h2 className="font-bold text-lg mb-4">{name.common}</h2>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">Population: <span className="font-extralight">{population.toLocaleString()}</span></p>
                  <p className="font-medium text-sm">Region: <span className="font-extralight">{region}</span></p>
                  <p className="font-medium text-sm">Capital: <span className="font-extralight">{capital ? capital[0] : "N/A"}</span></p>
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

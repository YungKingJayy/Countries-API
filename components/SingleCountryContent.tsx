"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MoveLeft } from "lucide-react";

const SingleCountryContent = () => {
  const searchParams = useSearchParams();
  const countryName = searchParams.get("name");

  interface Country {
    name: {
      common: string;
      nativeName?: {
        [key: string]: {
          common: string;
        };
      };
    };
    flags: {
      svg: string;
    };
    population: number;
    region: string;
    capital?: string[];
    currencies?: {
      [key: string]: {
        name: string;
      };
    };
    languages?: {
      [key: string]: string;
    };
    tld?: string[];
    borders?: string[];
  }

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  useEffect(() => {
    if (!countryName) return;

    const fetchCountry = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        if (!res.ok) throw new Error("Country not found");

        const data = await res.json();
        setCountry(data[0]); // Store first country result
        setError("");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  useEffect(() => {
    if (!country?.borders || country.borders.length === 0) {
      setBorderCountries([]);
      return;
    }

    const fetchBorderCountries = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${country?.borders?.join(",")}`
        );
        if (!res.ok) throw new Error("Border countries not found");

        const data = await res.json();
        setBorderCountries(data.map((borderCountry: any) => borderCountry.name.common));
      } catch (err: any) {
        console.error("Error fetching border countries:", err.message);
      }
    };

    fetchBorderCountries();
  }, [country?.borders]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!country) return <p className="text-center text-lg">No country found.</p>;

  const { name, flags, population, region, capital, currencies, languages, tld } = country;
  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : "N/A";

  const countryDetails = [
    { label: "Native Name", value: nativeName },
    { label: "Population", value: population.toLocaleString() || "N/A" },
    { label: "Region", value: region },
    { label: "Sub Region", value: region },
    { label: "Capital", value: capital?.[0] || "N/A" },
  ];

  const additionalDetails = [
    { label: "Top Level Domain", value: tld?.[0] || "N/A" },
    {
      label: "Currencies",
      value: currencies ? Object.values(currencies).map((c) => c.name).join(", ") : "N/A",
    },
    {
      label: "Languages",
      value: languages ? Object.values(languages).join(", ") : "N/A",
    },
  ];

  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <p>
      <span className="font-medium">{label}:</span>
      <span className="font-extralight"> {value}</span>
    </p>
  );

  return (
    <main className="mx-auto max-w-[1440px] pt-16">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 rounded-lg bg-white px-8 py-2 text-darktext shadow-md dark:bg-darkblue dark:text-white"
      >
        <MoveLeft className="text-darktext dark:text-white" />
        <p>Back</p>
      </Link>

      {/* Country Details */}
      <section className="gap- grid-col mt-16 grid lg:grid-cols-2 lg:gap-28">
        <div>
          <Image
            src={flags?.svg}
            alt={name?.common}
            width={500}
            height={300}
            className="w-full"
          />
        </div>
        <div className="flex h-full flex-col py-10">
          <h1 className="text-3xl font-extrabold text-darktext dark:text-white">{name?.common}</h1>

          <div className="mb-10 mt-5 flex flex-col justify-between gap-10 md:mb-6 md:flex-row">
            <div className="flex flex-col flex-nowrap gap-2">
              {countryDetails.map((item) => (
                <DetailItem key={item.label} {...item} />
              ))}
            </div>
            <div className="flex flex-col flex-nowrap gap-2">
              {additionalDetails.map((item) => (
                <DetailItem key={item.label} {...item} />
              ))}
            </div>
          </div>

          {/* Border Countries */}
          <div className="mt-auto flex flex-col gap-2 md:flex-row md:items-center">
            <p className="font-medium">Border Countries:</p>
            <div className="flex flex-wrap gap-2">
              {borderCountries.length > 0 ? (
                borderCountries.map((border, index) => (
                  <Link
                    href={`/country?name=${border}`}
                    key={index}
                    className="rounded-md bg-white px-6 py-1 text-sm text-darktext shadow-md dark:bg-darkblue dark:text-white"
                  >
                    {border}
                  </Link>
                ))
              ) : (
                <p className="text-darktext dark:text-white">No border countries available.</p>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default SingleCountryContent;

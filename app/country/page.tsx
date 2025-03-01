"use client";

import SingleCountryContent from "@/components/SingleCountryContent";
import { Suspense } from "react";
const SingleCountry = () => {
  return (
    <Suspense fallback={<p className="text-center text-lg">Loading country data...</p>}>
      <SingleCountryContent />
    </Suspense>
  );
};

export default SingleCountry;

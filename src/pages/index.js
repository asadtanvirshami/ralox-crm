import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Head from "next/head";

import Loader from "@/components/Shared/Loader";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay using setTimeout
    const delay = 800; // Adjust the delay duration in milliseconds

    const timeoutId = setTimeout(() => {
      router.push("/dashboard");
    }, delay);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div>
        <Head>
          <title>RALOX</title>
          <meta name="description" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex align-middle justify-center grid items-center justify-center h-screen w-screen bg-gradient-to-r from-rose-500 to-orange-500 ">
          <Loader />
        </div>
      </div>
    </>
  );
}

import React from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";

import { verifyTokenRequest } from "@/api/auth";
import Transaction from "@/components/layout/transaction";
const transaction = ({ sessionData }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (sessionData.success === false) {
      router.push("/auth");
    }
  }, []);

  return (
    <>
      <Transaction />
    </>
  );
};

export default transaction;

export const getServerSideProps = async ({ req, res }) => {
  // Fetch data from external API
  const sessionData = await verifyTokenRequest(Cookies, req, res);
  if (!sessionData) {
    // Pass data to the page via props
    return {
      props: { sessionData: { success: false } },
    };
  }
  if (sessionData) {
    // Pass data to the page via props
    return {
      props: { sessionData: sessionData },
    };
  }
};

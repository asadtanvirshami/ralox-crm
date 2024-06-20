import React from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";

import Sales from "@/components/layout/sales/index";

import { verifyTokenRequest } from "@/api/auth";

const Sale = ({ sessionData }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (sessionData.success === false) {
      router.push("/auth");
    }
  }, []);
  return (
    <React.Fragment>
      <Sales />
    </React.Fragment>
  );
};

export default Sale;
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

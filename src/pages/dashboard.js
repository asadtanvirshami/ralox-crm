import React from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";

import { verifyTokenRequest } from "@/api/auth";
import Portal from "@/components/layout/dashboard/portal";

const Dashboard = ({ sessionData }) => {
  const router = useRouter();

  React.useEffect(() => {
    console.log();
    if (sessionData.success === false) {
      router.push("/auth");
    }
  }, []);

  return (
    <React.Fragment>
      <Portal />
    </React.Fragment>
  );
};

export default Dashboard;

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

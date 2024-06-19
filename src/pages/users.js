import React from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";

import Users from "@/components/layout/user";

import { verifyTokenRequest } from "@/api/auth";

const User = ({ sessionData }) => {
  const router = useRouter();

  // React.useEffect(() => {
  //   if (sessionData.success === false) {
  //     router.push("/auth");
  //   }
  // }, []);
  return (
    <>
      <Users />
    </>
  );
};

export default User;

// export const getServerSideProps = async ({ req, res }) => {
//   // Fetch data from external API
//   const sessionData = await verifyTokenRequest(Cookies, req, res);
//   if (!sessionData) {
//     // Pass data to the page via props
//     return {
//       props: { sessionData: { success: false } },
//     };
//   }
//   if (sessionData) {
//     // Pass data to the page via props
//     return {
//       props: { sessionData: sessionData },
//     };
//   }
// };

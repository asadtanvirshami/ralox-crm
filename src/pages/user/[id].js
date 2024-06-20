import Cookies from "cookies";
import React from "react";
import { useRouter } from "next/router";
import { userGetRequest, verifyTokenRequest } from "@/api/auth";

const UserPage = ({ data, sessionData }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (sessionData.success === false) {
      router.push("/auth");
    }
  }, []);
  return (
    <div className="container justify-center flex align-middle mx-auto">
      {data?.id}
    </div>
  );
};

export default UserPage;

export async function getServerSideProps({ params, req, res }) {
  const sessionRequest = await verifyTokenRequest(Cookies, req, res);

  try {
    const data = await userGetRequest((params.id));
    console.log(data);
    return {
      props: {
        sessionData: sessionRequest,
        data: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { data: null, sessionData: { success: false } },
    };
  }
}

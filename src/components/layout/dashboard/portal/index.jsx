import React, { useState } from "react";

import { useAtom } from "jotai";
import { userAtom } from "@/jotai/atoms/userAtom";

import Agent from "../agent";
import Admin from "../admin";

const Portal = () => {
  const [user] = useAtom(userAtom);
  const [userData, setUserData] = useState();

  React.useEffect(() => {
    setUserData(user);
  }, []);

  return (
    <React.Fragment>
      {/* {user?.role == "agent" && <Agent />} */}
      {userData?.role == "admin" && <Admin />}
    </React.Fragment>
  );
};

export default Portal;

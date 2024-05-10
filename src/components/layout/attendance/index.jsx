import React from "react";
import AdminPanel from "./admin";

const index = () => {
  return (
    <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
      <AdminPanel />
    </div>
  );
};

export default index;

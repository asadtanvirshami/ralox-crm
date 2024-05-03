import React, { memo } from "react";

import Login from "@/components/layout/auth/login/login";

const auth = () => {
  return (
    <div
      data-cy="main-grid"
      className="grid items-center justify-center h-screen w-screen"
    >
      <div className="lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen">
        <div className="hidden sm:flex h-screen align-middle justify-center items-center xl:col-span-2">
          <div className="justify-center align-middle items-center">
            {/* <h1 className="mx-auto text-8xl font-bold text-rose-500"> */}
            <h1 className="mx-auto text-8xl font-bold text-blue-500">
              RALOX CRM
            </h1>
            <h5 className="mx-auto text-4xl font-bold text-theme-700 justify-center flex mt-2">
              Admin Panel
            </h5>
            <div className="flex inline-block align-middle justify-center mt-5">
              <div className="p-2 font-body text-xl">
                Enter credentials to access.
              </div>
            </div>
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default memo(auth);

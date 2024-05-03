import React from "react";

import Reset from "@/components/layout/auth/reset/reset";

const reset = () => {
  return (
    <div
      data-cy="main-grid"
      className="grid items-center justify-center h-screen w-screen bg-gradient-to-r from-rose-500 to-orange-500"
    >
      <Reset />
    </div>
  );
};

export default reset;

import React, { memo } from "react";

const Loader = () => {
  return (
    <div className="text-center" style={{ paddingTop: "15%" }}>
      <img src="/loader.svg" />
    </div>
  );
};

export default memo(Loader);

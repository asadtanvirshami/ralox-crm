import React, { memo } from "react";

const Spinner = () => {
  return (
    <div className="text-center" style={{ paddingTop: "15%" }}>
      <img src="/spinner.svg" />
    </div>
  );
};

export default memo(Spinner);

import React from "react";
import InfoSection from "./InfoSection";

function Container({ children }) {
  return (
    <div className=" container w-full">
      <InfoSection />
      <>{children}</>
    </div>
  );
}

export default React.memo(Container);

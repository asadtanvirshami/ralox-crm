import React from "react";

function Container({ children }) {
  return (
    <div className="mx-auto px-3 sm:px-6 container ">
      <>{children}</>
    </div>
  );
}

export default React.memo(Container);

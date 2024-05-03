import React, { useState } from "react";
import classNames from "classnames";
//****Components****
import { Toaster } from "@/components/ui/toaster"
import OffCanvas from "../OffCanvas";

const Layout = ({ children }) => {
  const [collapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <div
        className={classNames({
          // use grid layout
          "grid min-h-screen": true,
          // toggle the width of the sidebar depending on the state
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          // transition animation classes
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        {/* sidebar */}
        {/* <div className="bg-gradient-to-r border from-slate-300 to-white shadow-lg text-red"> */}
        <div className="bg-white text-theme-700 border border-none shadow-lg">
          <OffCanvas
            collapsed={collapsed}
            setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
          />
        </div>
        {/* content */}
        <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex-wrap content-start w-full">
          {children}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default React.memo(Layout);

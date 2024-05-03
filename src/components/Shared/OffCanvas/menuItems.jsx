import React from "react";
import { useRouter } from "next/router";

import classNames from "classnames";

const color = {
  active_text: "text-slate-400",
  inctive_text: "text-gray-500",
};

const MenuItems = (props) => {
  const router = useRouter();

  return (
    <>
      <a
        href={props.menu_.link}
        className={classNames({
          "text-indigo-100 flex": true, //colors
          "transition-colors duration-200": true, //animation
          "rounded-md p-2 mx-3 gap-2": !props.collapsed,
          "rounded-full p-2 mx-3 w-10 h-10": props.collapsed,
        })}
      >
        {router.route == props.menu_.link ? (
          <props.menu_.svg
            className="w-4 h-4 text-slate-400 hover:text-slate-400 transition duration-75"
            alt={props.menu_.text}
          />
        ) : (
          <props.menu_.svg
            className="w-4 h-4 text-gray-500 hover:text-slate-400 transition duration-75"
            alt={props.menu_.text}
          />
        )}
        <span
          className={
            router.route == props.menu_.link
              ? `${color.active_text} font-semibold`
              : `${color.inctive_text} font-semibold `
          }
        >
          {!props.collapsed && props.menu_.text}
        </span>
      </a>
    </>
  );
};

export default React.memo(MenuItems);

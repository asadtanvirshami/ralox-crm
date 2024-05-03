import React, { useRef } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
//****Icon-imports****
import {
  HiOutlineChevronDoubleRight,
  HiOutlineChevronDoubleLeft,
  HiOutlineCog8Tooth,
  HiOutlineWindow,
  HiOutlineChartBarSquare,
  HiOutlineArrowRightOnRectangle,
  HiChartBar,
  HiChatBubbleBottomCenter,
  HiChatBubbleOvalLeft,
  HiOutlineChatBubbleOvalLeft,
} from "react-icons/hi2";
//****Components****
import MenuItems from "./menuItems";

//add NavItem prop to component prop
const Sidebar = ({ collapsed, setCollapsed }) => {
  const router = useRouter();

  const adminMenu = [
    { id: 0, text: "Dashboard", link: "/dashboard", svg: HiOutlineWindow },
    { id: 1, text: "Stats", link: "/", svg: HiOutlineChartBarSquare },
    { id: 6, text: "Settings", link: "/setting", svg: HiOutlineCog8Tooth },
    { id: 6, text: "Chat", link: "/chat", svg: HiOutlineChatBubbleOvalLeft },
  ];

  const Icon = collapsed
    ? HiOutlineChevronDoubleRight
    : HiOutlineChevronDoubleLeft;
  return (
    <div
      className={classNames({
        "borderrounded-t-3xl fixed md:static md:translate-x-0 z-20 ": true,
        "transition-all duration-300 ease-in-out": false,
        "w-[200px]": !collapsed,
        "w-16": collapsed,
      })}
    >
      <div
        className={classNames({
          " flex flex-col justify-between h-screen sticky inset-0 w-full  ": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center  border-gray-200 transition-none": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && (
            <span className="whitespace-nowrap font-semibold">
              Administrator
            </span>
          )}
          <button
            className="grid place-content-center hover:bg-slate-400 hover:text-white w-10 h-10 rounded-full opacity-0 md:opacity-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            <ul
              className={classNames({
                "my-2 flex flex-col gap-2 items-stretch": true,
              })}
            >
              {adminMenu.map((menu_, i) => {
                return (
                  <>
                    <MenuItems collapsed={collapsed} menu_={menu_} />
                  </>
                );
              })}
            </ul>
          </ul>
        </nav>
        <div
          className={classNames({
            "grid place-content-stretch p-4 ": true,
          })}
        >
          <div className="flex gap-4 items-center h-12 max-w-full overflow-hidden">
            {/* <User
              className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
              fill={"#fff"}
              src={User}
            /> */}
            {/* <IconButton
              color="red"
              ripple={true}
              variant="gradient"
              className={
                collapsed
                  ? "rounded-full hover:shadow-none w-8 h-8 transition duration-75"
                  : "rounded-full hover:shadow-none "
              }
            >
              {/* <span> {name?.charAt(0).toUpperCase()}</span> */}
            {/* <span> {'Johnathan Clark'}</span */}
            {/* </IconButton> */}
            {!collapsed && (
              <div className="=flex items-center h-full sm:justify-center xl:justify-start ">
                <div className=" sm:hidden xl:block font-bold text-white">
                  {/* {name?.toUpperCase("0")} */}
                </div>
                <Link href="." className="color-white text-sm">
                  View Profile
                </Link>
                <button className="float-right">
                  <HiOutlineArrowRightOnRectangle
                    className="block sm:hidden xl:block w-6 h-5 ml-28"
                    fill={"#fff"}
                  />
                </button>
                <div className="flex-grow block sm:hidden xl:block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Sidebar);

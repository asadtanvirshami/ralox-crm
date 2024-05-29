import React, { useState } from "react";
import classNames from "classnames";
//*Components*
import { Toaster } from "@/components/ui/toaster";
import Nav from "../OffCanvas";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  AlignLeft,
  AlignRight,
  CalendarCheck,
  Globe,
  LayoutDashboard,
  UsersRound,
  LineChart,
  LogOut,
  TicketPlus,
  List,
  ArrowRightLeft,
  SquareGanttChart,
} from "lucide-react";

import { useRouter } from "next/router";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

const Layout = ({ children, defaultLayout, navCollapsedSize = 4 }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const router = useRouter();
  return (
    <>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch w-full"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={false}
            onCollapse={() => setIsCollapsed((prev) => !prev)}
            className={cn(
              isCollapsed &&
                " max-w-[50px] md:max-w-[70px] lg:max-w-[50px] transition-all duration-300 ease-in-out",
              !isCollapsed &&
                "min-w-[50px] max-w-[150px] transition-all duration-300 ease-in-out"
            )}
          >
            <div
              className={cn(
                "flex h-[52px] items-center ",
                isCollapsed
                  ? "h-[52px] justify-center "
                  : "px-2 justify-between text-xl"
              )}
            >
              <h3 className={` transition-all duration-300 ease-in-out `}>
                {!isCollapsed && "Ralox"}
                {isCollapsed && ""}
              </h3>

              <div className="">
                <div className="rounded-full px-2 bg-sky-500 w-full h-8 justify-center items-center align-middle flex ">
                  {isCollapsed && (
                    <AlignLeft
                      size={20}
                      color="white"
                      className=" cursor-pointer"
                      onClick={() => {
                        setIsCollapsed((prev) => !prev);
                      }}
                    />
                  )}
                  {!isCollapsed && (
                    <AlignRight
                      size={20}
                      color="white"
                      className=" cursor-pointer"
                      onClick={() => {
                        setIsCollapsed((prev) => !prev);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              links={[
                {
                  title: "Dashboard",
                  icon: LayoutDashboard,
                  variant: `${
                    router.pathname === "/dashboard" ? "default" : "ghost"
                  }`,
                  href: "/dashboard",
                },
                {
                  title: "Users",
                  icon: UsersRound,
                  variant: `${
                    router.pathname === "/users" ? "default" : "ghost"
                  }`,
                  href: "/users",
                },
              ]}
            />
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              links={[
                {
                  title: "Attendance",
                  icon: CalendarCheck,
                  variant: `${
                    router.pathname === "/attendance" ? "default" : "ghost"
                  }`,
                  href: "/attendance",
                },
                {
                  title: "Sales",
                  icon: LineChart,
                  variant: `${
                    router.pathname === "/sales" ? "default" : "ghost"
                  }`,
                  href: "/sales",
                },
                {
                  title: "Tickets",
                  icon: TicketPlus,
                  variant: `${
                    router.pathname === "/ticket" ? "default" : "ghost"
                  }`,
                  href: "/ticket",
                },
                {
                  title: "Leads",
                  icon: List,
                  variant: `${
                    router.pathname === "/lead" ? "default" : "ghost"
                  }`,
                  href: "/lead",
                },
                {
                  title: "Transactions",
                  icon: ArrowRightLeft,
                  variant: `${
                    router.pathname === "/transactions" ? "default" : "ghost"
                  }`,
                  href: "/lead",
                },
                {
                  title: "Projects",
                  icon: SquareGanttChart,
                  variant: "ghost",
                  href: "/lead",
                },
                {
                  title: "Web Admin",
                  icon: Globe,
                  variant: "ghost",
                  href: "/users",
                },
              ]}
            />
            <Separator />
            <div className="flex justify-center mt-10">
              {!isCollapsed ? (
                <Button
                  size="sm"
                  onClick={() => {
                    Cookies.remove("user");
                    Cookies.remove("token");
                    router.push("/auth");
                  }}
                  variant="outline"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </Button>
              ) : (
                <Button
                  size="xsm"
                  variant="ghost"
                  onClick={() => {
                    Cookies.remove("user");
                    Cookies.remove("token");
                    router.push("/auth");
                  }}
                >
                  <LogOut size={20} />
                </Button>
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={defaultLayout[1]}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>

      <Toaster />
    </>
  );
};

export default React.memo(Layout);

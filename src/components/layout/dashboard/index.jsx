import React, { Fragment, memo } from "react";

import Graph from "@/components/shared/Graph";
import Container from "@/components/Shared/Layout/Container";
import InfoSection from "@/components/Shared/Layout/InfoSection";
import BarCharT from "@/components/Shared/Charts";
import StaticCard from "@/components/Shared/Cards/StaticCard";

import { HiCurrencyDollar } from "react-icons/hi2";
import { BiInfoCircle } from "react-icons/bi";
import { BiSolidDisc } from "react-icons/bi";
import InfoCard from "@/components/Shared/Cards/InfoCard";
import TableCard from "@/components/Shared/Cards/TableCard";

import { ComponentDialog } from "@/components/Shared/Dialog/";
import CreateUser from "@/components/Shared/Forms/User/CreateUser";
import { useToast } from "@/components/ui/use-toast";
const Dashboard = () => {
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const { toast } = useToast();
  return (
    <Fragment>
      <Container>
        <InfoSection />
        <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <StaticCard
            title={"Sales"}
            className={" bg-gradient-to-r from-green-300 to-green-400 "}
            amount={1000}
            icon={<HiCurrencyDollar fontSize={30} color="white" />}
          />
          <StaticCard
            title={"Expenses"}
            className={" bg-gradient-to-r from-pink-300 to-pink-400 "}
            amount={1000}
            icon={<BiInfoCircle fontSize={30} color="white" />}
          />
          <StaticCard
            title={"Profit"}
            className={" bg-gradient-to-r from-blue-300 to-blue-400 "}
            amount={1000}
            icon={<BiSolidDisc fontSize={30} color="white" />}
          />
          <div className="w-full p-2 lg:w-2/3">
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <Graph />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3 ">
            <div className="rounded-lg bg-card h-80">
              <InfoCard
                setOpen={setOpenCreateDialog}
                label={""}
                title={"Agents"}
                link={"/dashboard"}
              />
            </div>
          </div>
          <div className="w-full p-2 lg:w-4/4 space-x-6 md:grid grid-cols-2">
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <BarCharT />
            </div>
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <TableCard />
            </div>
          </div>
        </div>
        <button
          variant="outline"
          onClick={() => {
            toast({
              variant: "succes",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }}
        >
          Show Toast
        </button>
      </Container>
      <ComponentDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        children={<CreateUser />}
      />
    </Fragment>
  );
};

export default memo(Dashboard);

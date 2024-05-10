import React, { Fragment, memo } from "react";

import Graph from "@/components/shared/Graph";
import Container from "@/components/Shared/Layout/Container";
import InfoSection from "@/components/Shared/Layout/InfoSection";
import BarCharT from "@/components/Shared/Charts";
import StaticCard from "@/components/Shared/Cards/StaticCard";

import InfoCard from "@/components/Shared/Cards/InfoCard";
import TableCard from "@/components/Shared/Cards/TableCard";

import { ComponentDialog } from "@/components/Shared/Dialog/";
// import CreateUser from "@/components/Shared/Forms/User/UserCE";
import { useToast } from "@/components/ui/use-toast";
import {
  Activity,
  CircleDollarSign,
  CirclePercent,
  Wallet,
} from "lucide-react";

const AdminPanel = () => {
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const { toast } = useToast();
  return (
    <Fragment>
      <Container>
        <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <div className="grid w-full grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            <StaticCard
              title={"Sales"}
              className={" bg-gradient-to-r from-pink-400 to-pink-400 "}
              amount={1000}
              icon={<CircleDollarSign className="text-white" />}
            />
            <StaticCard
              title={"Expenses"}
              className={" bg-gradient-to-r from-sky-400 to-sky-400 "}
              amount={1000}
              icon={<CirclePercent className="text-white" />}
            />
            <StaticCard
              title={"Profit"}
              // className={" bg-gradient-to-r from-black to-theme-700 "}
              className={" bg-gradient-to-r from-teal-400 to-teal-400 "}
              amount={1000}
              icon={<Wallet className="text-white" />}
            />
            <StaticCard
              title={"Revenue"}
              // className={" bg-gradient-to-r from-black to-theme-700 "}
              className={" bg-gradient-to-r from-indigo-400 to-indigo-400 "}
              amount={1000}
              icon={<Activity className="text-white" />}
            />
          </div>
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
      </Container>
      <ComponentDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        // children={<CreateUser />}
      />
    </Fragment>
  );
};

export default memo(AdminPanel);

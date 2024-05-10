import React, { Fragment, memo } from "react";

import Graph from "@/components/shared/Graph";
import Container from "@/components/Shared/Layout/Container";
import StaticCard from "@/components/Shared/Cards/StaticCard";

import InfoCard from "@/components/Shared/Cards/InfoCard";
import TableCard from "@/components/Shared/Cards/TableCard";

import {
  Activity,
  ArrowBigUpDash,
  CircleDollarSign,
  CirclePercent,
  User2,
  Wallet,
} from "lucide-react";
import DetailsCard from "@/components/Shared/Cards/DetailsCard";

const AgentPanel = () => {


  return (
    <Fragment>
      <Container>
        <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <StaticCard
              title={"Sales"}
              className={" bg-gradient-to-r from-pink-400 to-pink-400 "}
              amount={1000}
              icon={<CircleDollarSign className="text-white" />}
            />

            <StaticCard
              title={"Target"}
              // className={" bg-gradient-to-r from-black to-theme-700 "}
              className={" bg-gradient-to-r from-teal-400 to-teal-400 "}
              amount={1000}
              icon={<ArrowBigUpDash className="text-white" />}
            />

            <DetailsCard
              title={"Target"}
              // className={" bg-gradient-to-r from-black to-theme-700 "}
              className={" bg-gradient-to-r from-teal-400 to-teal-400 "}
              amount={1000}
              icon={<ArrowBigUpDash className="text-white" />}
            />
          </div>
          <div className="w-full p-2 lg:w-2/3">
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <Graph />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3 ">
            <div className="rounded-lg bg-card h-80">
              <InfoCard label={""} title={"Tickets"} link={"/dashboard"} />
            </div>
          </div>
          <div className="w-full p-2 lg:w-4/4 space-x-6 md:grid grid-cols-2">
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <InfoCard label={""} title={"Sales"} link={"/dashboard"} />
            </div>
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <TableCard />
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default memo(AgentPanel);

import React, { Fragment, memo, useEffect, useState } from "react";
import Graph from "@/components/shared/Graph";
import Container from "@/components/Shared/Layout/Container";
import InfoSection from "@/components/Shared/Layout/InfoSection";
import BarCharT from "@/components/Shared/Charts";
import StaticCard from "@/components/Shared/Cards/StaticCard";
import InfoCard from "@/components/Shared/Cards/InfoCard";
import TableCard from "@/components/Shared/Cards/TableCard";
import { ComponentDialog } from "@/components/Shared/Dialog/";
import { useToast } from "@/components/ui/use-toast";
import {
  Activity,
  CircleDollarSign,
  CirclePercent,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { reportGetByFilterRequest } from "@/api/report";

const AdminPanel = () => {
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const { toast } = useToast();
  const [sales, setSales] = useState(0);
  const [expense, setExpense] = useState(0);
  const [profit, setProfit] = useState(0);
  const [saleGraphValue, setSaleGraphValue] = useState([]);

  const [months, setMonths] = useState("currentMonth");

  const month = [
    { id: "currentMonth", month: "Current Month" },
    { id: "previousMonth", month: "Previous Month" },
    { id: "lastSixMonths", month: "Last Six Months" },
    { id: "lastTwelveMonths", month: "Last Twelve Months" },
  ];

  const getSales = async () => {
    const sale = await reportGetByFilterRequest(months);
    setSales(sale?.data?.grand_total_sales);
    setExpense(sale?.data?.grand_total_expenses);
    setProfit(sale?.data?.grand_total_profit);
  };

  const getSalesGrapValues = async () => {
    const graphvalues = await reportGetByFilterRequest("lastSixMonths");
    setSaleGraphValue(graphvalues?.data?.data);
  };

  useEffect(() => {
    getSales();
    getSalesGrapValues();
  }, [months]);
  return (
    <Fragment>
      <Container>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                Month <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {month && (
                <>
                  {month.map((item) => {
                    return (
                      <DropdownMenuRadioGroup
                        className="cursor-pointer"
                        key={item.id}
                        value={item.id}
                        onValueChange={(event) => setMonths(event)}
                      >
                        <DropdownMenuRadioItem value={item.id}>
                          {item.month}
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    );
                  })}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <StaticCard
              title={"Sales"}
              className={" bg-gradient-to-r from-pink-400 to-pink-400 "}
              amount={sales}
              icon={<CircleDollarSign className="text-white" />}
            />
            <StaticCard
              title={"Expenses"}
              className={" bg-gradient-to-r from-sky-400 to-sky-400 "}
              amount={expense}
              icon={<CirclePercent className="text-white" />}
            />
            <StaticCard
              title={"Profit"}
              // className={" bg-gradient-to-r from-black to-theme-700 "}
              className={" bg-gradient-to-r from-teal-400 to-teal-400 "}
              amount={profit}
              icon={<Wallet className="text-white" />}
            />
          </div>
          <div className="w-full p-2 lg:w-2/3">
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <Graph saleGraphValue={saleGraphValue} />
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
              <BarCharT saleGraphValue={saleGraphValue} />
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

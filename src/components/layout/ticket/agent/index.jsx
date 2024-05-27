"use client";
import React, { Fragment, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "@/components/ui/use-toast";
import DataTable from "@/components/Shared/Table/Ticket/DataTable";
import TicketCE from "@/components/Shared/Forms/Ticket/TicketCE";
import { ticketGetRequest, ticketDeleteRequest } from "@/api/ticket";


const AgentPanel = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState({
    role: "",
    name: "",
    email: "",
    page: 1,
    pageSize: 8,
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["ticket"],
    queryFn: () =>
      ticketGetRequest(),
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });


  return (
    <Fragment>
      <>
        <div className="container flex justify-center items-center h-screen  ">
          <div className="container bg-white p-10 rounded-lg shadow-lg h-fit">
            <h1 className="text-2xl mb-18 font-semibold">{"Ticket"}</h1>
            <Tabs defaultValue="ticket" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="ticket">All Ticket</TabsTrigger>
                <TabsTrigger value="registration">Create Ticket</TabsTrigger>
              </TabsList>
              <TabsContent value="ticket">
                <DataTable
                  data={data ? data?.data : []}
                  isLoading={isLoading}
                  totalCount={data?.totalCount}
                />
              </TabsContent>
              <TabsContent value="registration">
                <div className="w-full mt-10">
                  <TicketCE />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    </Fragment>
  );
};

export default AgentPanel;

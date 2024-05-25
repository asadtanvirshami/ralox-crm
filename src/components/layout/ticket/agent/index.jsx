"use client";
import React, { Fragment, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { userDeleteRequest, userGetRequest } from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import DataTable from "@/components/Shared/Table/Ticket/DataTable";
import { columns } from "@/components/Shared/Table/Ticket/Columns";
import SaleCE from "@/components/Shared/Forms/Sale/SaleCE";
import TicketCE from "@/components/Shared/Forms/Ticket/TicketCE";

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
    queryKey: ["ticket", query.page, query.pageSize, query.email, query.name],
    queryFn: () =>
      userGetRequest(query.page, query.pageSize, query.email, query.name),
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });

  const deleteUserMutation = useMutation(userDeleteRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("ticket");
      toast({
        variant: "success",
        title: "Success",
        description: "User deleted successfully.",
        duration: 900,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to delete user.",
        duration: 900,
      });
    },
  });

  return (
    <Fragment>
      <>
        <div className="container flex justify-center items-center h-screen  ">
          <div className="container bg-white p-10 rounded-lg shadow-lg h-fit">
            <h1 className="text-2xl mb-18 font-semibold">{"Ticket"}</h1>
            <Tabs defaultValue="users" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="ticket">All Ticket</TabsTrigger>
                <TabsTrigger value="registration">Create Ticket</TabsTrigger>
              </TabsList>
              <TabsContent value="ticket">
                <DataTable
                  data={data ? data?.data : []}
                  columns={columns}
                  query={query}
                  isLoading={isLoading}
                  setQuery={setQuery}
                  totalCount={data?.totalCount}
                />
              </TabsContent>
              <TabsContent value="registration">
                <div className="w-full mt-10">
                  {/* {<SaleCE sales={data?.data} />} */}
                  <TicketCE />
                </div>
              </TabsContent>
            </Tabs>
            {/* <Table map={true} editable={false} data={data?.data?.data} /> */}
          </div>
        </div>
      </>
    </Fragment>
  );
};

export default AgentPanel;

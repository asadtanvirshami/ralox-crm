"use client";
import React, { Fragment, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { userDeleteRequest } from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import { columns } from "@/components/Shared/Table/Leads/Columns";
import DataTable from "@/components/Shared/Table/Leads/DataTable";
import SaleCE from "@/components/Shared/Forms/Sale/SaleCE";
import LeadCE from "@/components/Shared/Forms/Lead/LeadCE";
import { leadGetRequest } from "@/api/lead";

const Lead = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState({
    id: "",
    user_id: "",
    unit_id: "",
    type: "",
    month: "",
    potential: "",
    date: "",
    status: "",
    type: "",
    serial: "",
    page: 1,
    pageSize: 8,
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "leads",
      query.page,
      query.pageSize,
      query.id,
      query.user_id,
      query.unit_id,
      query.status,
      query.month,
      query.potential,
      query.type,
      query.serial,
    ],
    queryFn: () =>
      leadGetRequest(
        query.page,
        query.pageSize,
        query.id,
        query.user_id,
        query.unit_id,
        query.status,
        query.month,
        query.potential,
        query.type,
        query.serial
      ),
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });

  const deleteUserMutation = useMutation(userDeleteRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("leads");
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
            <h1 className="text-2xl mb-18 font-semibold">{"Lead"}</h1>
            <Tabs defaultValue="leads" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="leads">All Leads</TabsTrigger>
                <TabsTrigger value="registration">Create Lead</TabsTrigger>
              </TabsList>
              <TabsContent value="leads">
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
                  {<LeadCE sales={data?.data} />}
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

export default Lead;

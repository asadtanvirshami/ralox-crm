"use client";
import React, { Fragment, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { userDeleteRequest, userGetRequest } from "@/api/auth";
import { transactionGetRequest } from "@/api/transaction";
import { toast } from "@/components/ui/use-toast";
import DataTable from "@/components/Shared/Table/Transaction/DataTable";
import { columns } from "@/components/Shared/Table/Transaction/Columns";
import TransactionCE from "@/components/Shared/Forms/Transaction/TransactionCE";

const Agent = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState({
    id: "",
    user_id: "",
    serial: "",
    type: "",
    day: "",
    month: "",
    date: "",
    unit_id: "",
    page: 1,
    pageSize: 8,
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "transactions",
      query.page,
      query.pageSize,
      query.id,
      query.user_id,
      query.serial,
      query.type,
      query.day,
      query.month,
      query.date,
      query.unit_id,
    ],
    queryFn: () =>
      transactionGetRequest(
        query.page,
        query.pageSize,
        query.id,
        query.user_id,
        query.serial,
        query.type,
        query.day,
        query.month,
        query.date,
        query.unit_id,
      ),
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });


  const deleteUserMutation = useMutation(userDeleteRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
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
            <h1 className="text-2xl mb-18 font-semibold">{"Transactions"}</h1>
            <Tabs defaultValue="users" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="users">All Transactions</TabsTrigger>
                <TabsTrigger value="registration">
                  Create Transaction
                </TabsTrigger>
              </TabsList>
              <TabsContent value="users">
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
                  {<TransactionCE sales={data?.data} />}
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

export default Agent;

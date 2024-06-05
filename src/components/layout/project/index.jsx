"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns } from "@/components/Shared/Table/Leads/Columns";
import DataTable from "@/components/Shared/Table/project/DataTable";
import LeadCE from "@/components/Shared/Forms/Lead/LeadCE";
import {useQuery } from "react-query";
import { projectGetRequest } from "@/api/project";

const Project = () => {
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
      projectGetRequest(
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

  useEffect(() => {
    console.log("Project here ====> ",data)
  },[data])

  return (
    <Fragment>
      <>
        <div className="container flex justify-center items-center h-screen  ">
          <div className="container bg-white p-10 rounded-lg shadow-lg h-fit">
            <h1 className="text-2xl mb-18 font-semibold">{"Lead"}</h1>
            <Tabs defaultValue="project" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="project">All Project</TabsTrigger>
                <TabsTrigger value="registration">Create Project</TabsTrigger>
              </TabsList>
              <TabsContent value="project">
                <DataTable
                  data={data?.length ? data : []}
                  columns={columns}
                  query={query}
                  isLoading={isLoading}
                  setQuery={setQuery}
                  // totalCount={data?.totalCount}
                />
              </TabsContent>
              <TabsContent value="registration">
                <div className="w-full mt-10">
                  {/* {<LeadCE sales={data?.data} />} */}
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

export default Project;

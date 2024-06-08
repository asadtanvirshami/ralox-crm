"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns } from "@/components/Shared/Table/project/Columns";
import DataTable from "@/components/Shared/Table/project/DataTable";
import ProjectCE from "@/components/Shared/Forms/Project/ProjectCE";
import { useQuery } from "react-query";
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
      "projects",
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

  return (
    <Fragment>
      <>
        <div className="container flex justify-center items-center h-screen  ">
          <div className="container bg-white p-10 rounded-lg shadow-lg h-fit">
            <h1 className="text-2xl mb-18 font-semibold">{"Project"}</h1>
            <Tabs defaultValue="projects" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="projects">All Project</TabsTrigger>
                <TabsTrigger value="registration">Create Project</TabsTrigger>
              </TabsList>
              <TabsContent value="projects">
                <DataTable
                  data={data ? data?.data : []}
                  columns={columns}
                  query={query}
                  isLoading={isLoading}
                  setQuery={setQuery}
                />
              </TabsContent>
              <TabsContent value="registration">
                <div className="w-full mt-10">
                  {<ProjectCE sales={data?.data} />}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    </Fragment>
  );
};

export default Project;

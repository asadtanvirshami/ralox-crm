import React, { Fragment, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { userDeleteRequest, userGetRequest } from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import DataTable from "@/components/Shared/Table/Users/DataTable";
import { columns } from "@/components/Shared/Table/Users/Columns";
import UserCE from "@/components/Shared/Forms/User/UserCE";

const Users = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState({
    role: "",
    name: "",
    serial: "SR-",
    unitId: "",
    email: "",
    page: 1,
    pageSize: 8,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "users",
      query.page,
      query.pageSize,
      query.email,
      query.name,
      query.serial,
      query.unitId,
    ],
    queryFn: () =>
      userGetRequest(
        query.page,
        query.pageSize,
        query.email,
        query.name,
        query.serial,
        query.unitId
      ),
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });

  return (
    <Fragment>
      <>
        <div className="container flex justify-center items-center h-screen ">
          <div className="container bg-white p-10 rounded-lg shadow-lg h-fit">
            <h1 className="text-2xl mb-18 font-semibold">{"User"}</h1>
            <Tabs defaultValue="users" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="users">All Users</TabsTrigger>
                <TabsTrigger value="registration">Registration</TabsTrigger>
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
                <div className="w-fit m-10">
                  {<UserCE users={data?.data} />}
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

export default Users;

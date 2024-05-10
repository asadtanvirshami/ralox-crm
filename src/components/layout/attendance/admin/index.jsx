import React, { Fragment, useState } from "react";

import { useQuery, useQueryClient } from "react-query";
import { attendanceGetRequest } from "@/api/attendance";
import { columns } from "@/components/Shared/Table/Attendance/Columns";
import DataTable from "@/components/Shared/Table/Attendance/DataTable";

const AdminPanel = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState({
    date: "",
    page: 1,
    pageSize: 8,
    name: "",
    user_id: "",
  });

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "attendance",
      query.page,
      query.pageSize,
      query.date,
      query.name,
      query.user_id,
    ],
    queryFn: () =>
      attendanceGetRequest(
        query.page,
        query.pageSize,
        query.date,
        query.name,
        query.user_id
      ),
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="container flex justify-center items-center h-full ">
      <div className="container bg-white p-10 rounded-lg shadow-lg h-[50vh]">
        <h1 className="text-2xl mb-18 font-semibold">{"Attendance"}</h1>
        {
          <DataTable
            data={data ? data?.data?.data : []}
            columns={columns}
            query={query}
            isLoading={isLoading}
            setQuery={setQuery}
            totalCount={data?.totalCount}
          />
        }
        {/* <Table map={true} editable={false} data={data?.data?.data} /> */}
      </div>
    </div>
  );
};

export default AdminPanel;

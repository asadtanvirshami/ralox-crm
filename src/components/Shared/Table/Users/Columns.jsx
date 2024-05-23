import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentDialog } from "../../Dialog";

import { formAtom } from "@/jotai/atoms/formAtom";
import { Edit, Trash } from "lucide-react";
import { useSetAtom } from "jotai";
import { useMutation, useQueryClient } from "react-query";
import UserCE from "../../Forms/User/UserCE";
import { userDeleteRequest } from "@/api/auth";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="name"
          onClick={() =>
            column.toggleSorting(column.getIsSorted("name") === "asc")
          }
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "serial",
    header: "Serial",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("serial")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.ProfileInfo.designation}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.ProfileInfo.phone}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  // {
  //   accessorKey: "has_salary",
  //   header: "Salary",
  //   cell: ({ row }) => (
  //     <div className="capitalize">
  //       {typeof row.getValue("has_salary") === "boolean" && (
  //         <>{row.getValue("has_salary") ? "true" : "false"}</>
  //       )}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "has_commission",
  //   header: "Commission",
  //   cell: ({ row }) => (
  //     <div className="capitalize">
  //       {typeof row.getValue("has_commission") === "boolean" && (
  //         <>{row.getValue("has_commission") ? "true" : "false"}</>
  //       )}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "has_allowance",
  //   header: "Allowance",
  //   cell: ({ row }) => (
  //     <div className="capitalize">
  //       {typeof row.getValue("has_allowance") === "boolean" && (
  //         <>{row.getValue("has_allowance") ? "true" : "false"}</>
  //       )}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "blocked",
    header: "Blocked",
    cell: ({ row }) => (
      <div className="capitalize">
        {typeof row.getValue("blocked") === "boolean" && (
          <>{row.getValue("blocked") ? "true" : "false"}</>
        )}
      </div>
    ),
  },
  {
    accessorKey: "warning",
    header: "Warning",
    cell: ({ row }) => (
      <div className="capitalize">
        {typeof row.original?.ProfileInfo?.warning === "boolean" && (
          <>{row.original?.ProfileInfo?.warning ? "true" : "false"}</>
        )}
      </div>
    ),
  },
  {
    accessorKey: "authorized",
    header: "Authorized",
    cell: ({ row }) => (
      <div className="capitalize">
        {typeof row.original?.ProfileInfo?.authorized === "boolean" && (
          <>{row.original?.ProfileInfo?.authorized ? "true" : "false"}</>
        )}
      </div>
    ),
  },
  {
    accessorKey: "Allowance",
    header: "Allowance",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.has_allowance ? row.original?.Allowance?.amount : "-"}
      </div>
    ),
  },
  {
    accessorKey: "CommissionRate",
    header: "Commission",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.has_commission ? row.original?.CommissionRate?.rate : "-"}
      </div>
    ),
  },
  {
    accessorKey: "Salary",
    header: "Salary",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.has_salary ? row.original?.Salary?.amount : "-"}
      </div>
    ),
  },
  {
    accessorKey: "edit",
    header: ({ column }) => {
      return <Button variant="Edit">Edit</Button>;
    },
    cell: ({ row }) => {
      const setState = useSetAtom(formAtom);
      return (
        <ComponentDialog
          onClick={() => {
            setState({ edit: true, value: row.original });
          }}
          onCancel={() => {
            setState({ edit: false, value: null });
          }}
          trigger={<Edit size={20} />}
        >
          <UserCE />
        </ComponentDialog>
      );
    },
  },
  {
    accessorKey: "delete",
    header: ({ column }) => {
      return <Button variant="s">Delete</Button>;
    },
    cell: ({ row }) => {
      const queryClient = useQueryClient();
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
        <Trash
          onClick={() => deleteUserMutation.mutate(row.original.id)}
          size={20}
          className="cursor-pointer"
        />
      );
    },
  },
];

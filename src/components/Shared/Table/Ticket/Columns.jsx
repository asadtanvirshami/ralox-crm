import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentDialog } from "../../Dialog";

import { formAtom } from "@/jotai/atoms/formAtom";
import { Edit, Trash } from "lucide-react";
import { useSetAtom } from "jotai";
import { useMutation, useQueryClient } from "react-query";
import TicketCE from "../../Forms/Ticket/TicketCE";
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
  //   {
  //     accessorKey: "id",
  //     header: "Id",
  //     cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  //   },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="title"
          onClick={() =>
            column.toggleSorting(column.getIsSorted("title") === "asc")
          }
        >
          Title
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "serial",
    header: "Serial",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("serial")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.ProfileInfo.approved}</div>
    ),
  },
  {
    accessorKey: "approved_by",
    header: "Approved By",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.ProfileInfo.approved_by}</div>
    ),
  },
  {
    accessorKey: "closed",
    header: "Closed",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("closed")}</div>
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
          <TicketCE />
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

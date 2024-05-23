import React, { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentDialog } from "../../Dialog";
import { Edit, Trash } from "lucide-react";

import { formAtom } from "@/jotai/atoms/formAtom";
import { useSetAtom } from "jotai";

import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { useMutation, useQueryClient } from "react-query";
import { userDeleteRequest } from "@/api/auth";
import LeadCE from "../../Forms/Lead/LeadCE";

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
    accessorKey: "serial",
    header: "Serial",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("serial")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="email"
          onClick={() =>
            column.toggleSorting(column.getIsSorted("email") === "asc")
          }
        >
          Email
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "query",
    header: "Query",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("query")}</div>
    ),
  },
  {
    accessorKey: "post",
    header: "Post",
    cell: ({ row }) => <div className="capitalize">{row.getValue("post")}</div>,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div className="capitalize">{row.getValue("city")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("country")}</div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("source")}</div>
    ),
  },
  {
    accessorKey: "source_link",
    header: "Source link",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("source_link")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let statusColor;

      switch (status) {
        case "Converted":
          statusColor = "text-green-500";
          break;
        case "Not Converted":
          statusColor = "text-red-500";
          break;
        default:
          statusColor = "text-gray-500"; // Default color for unexpected status values
          break;
      }

      return <div className={`capitalize font-semibold ${statusColor}`}>{status}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      let typeColor;

      switch (type) {
        case "Fresh Lead":
          typeColor = "text-green-500";
          break;
        case "Warm Lead":
          typeColor = "text-yellow-500";
          break;
        case "Cold Lead":
          typeColor = "text-blue-500";
          break;
        default:
          typeColor = "text-gray-500"; // Default color for unexpected type values
          break;
      }

      return <div className={`capitalize font-semibold ${typeColor}`}>{type}</div>;
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("comments")}</div>
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
          <LeadCE />
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Lead</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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
import { Edit, Eye, Star, Trash, View } from "lucide-react";

import { formAtom } from "@/jotai/atoms/formAtom";
import { useSetAtom } from "jotai";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { useMutation, useQueryClient } from "react-query";
import { leadDeletedRequest } from "@/api/lead";
import LeadCE from "../../Forms/Lead/LeadCE";
import moment from "moment";
import TransactionCE from "../../Forms/Transaction/TransactionCE";

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
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="amount"
          onClick={() =>
            column.toggleSorting(column.getIsSorted("amount") === "asc")
          }
        >
          Amount
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "outstanding",
    header: ({ column }) => {
      return (
        <Button
          variant="outstanding"
          onClick={() =>
            column.toggleSorting(column.getIsSorted("outstanding") === "asc")
          }
        >
          Outstanding
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("outstanding")}</div>,
  },
  {
    accessorKey: "acc_no",
    header: "Account",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("acc_no")}</div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Method",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("payment_method")}</div>
    ),
  },
  {
    accessorKey: "day",
    header: "Day",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("day")}</div>
    ),
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("month")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize">{moment(row.getValue("date")).format('MMMM Do YYYY')}</div>
    ),
  },
  // {
  //   accessorKey: "Unit",
  //   header: "Unit",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("Unit")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "User",
  //   header: "User",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("")}</div>
  //   ),
  // },
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
          <TransactionCE />
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
      const deleteLeadMutation = useMutation(leadDeletedRequest, {
        onSuccess: () => {
          queryClient.invalidateQueries("leads");
          toast({
            variant: "success",
            title: "Success",
            description: "Lead deleted successfully.",
            duration: 900,
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Failed to delete lead.",
            duration: 900,
          });
        },
      });
      return (
        <Trash
          onClick={() => deleteLeadMutation.mutate(row.original.id)}
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
              onClick={() => navigator.clipboard.writeText(payment.serial)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Transaction</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

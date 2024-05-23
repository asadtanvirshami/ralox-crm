import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CaretSortIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";
import { ComponentDialog } from "../../Dialog";
import Map from "../../Map";

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
    accessorKey: "User",
    header: ({ column }) => {
      return (
        <Button
          variant="User"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("User").name}</div>,
  },
  {
    accessorKey: "clock_in",
    header: "Check In",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clock_in")}</div>
    ),
  },
  {
    accessorKey: "clock_out",
    header: "Check Out",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clock_out")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="Date"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "map",
    header: ({ column }) => {
      return <Button variant="Date">Location</Button>;
    },
    cell: ({ row }) => {
      return (
        <ComponentDialog title={"Location"} trigger={"View"}>
          <Map location={{ lat: row.original.lat, lng: row.original.lng }} />
        </ComponentDialog>
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
            <DropdownMenuItem>View Attendance</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentDialog } from "../../Dialog";
import { Edit, Trash } from "lucide-react";

import { formAtom } from "@/jotai/atoms/formAtom";
import { useSetAtom } from "jotai";
import { useMutation, useQueryClient } from "react-query";
import ProjectCE from "../../Forms/Project/ProjectCE";
import { projectDeletedRequest } from "@/api/project";
import { toast } from "@/components/ui/use-toast";

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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize max-w-32 max-h-4 overflow-hidden">
        {row.getValue("description")}{" "}
      </div>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("start_date").split("T")[0]}{" "}
      </div>
    ),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("end_date").split("T")[0]}{" "}
      </div>
    ),
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("deadline").split("T")[0]}{" "}
      </div>
    ),
  },
  {
    accessorKey: "unit_id",
    header: "Unit Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("unit_id")} </div>
    ),
  },
  {
    accessorKey: "doc_link",
    header: "Doc Link",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("doc_link")} </div>
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

      return (
        <div className={`capitalize font-semibold ${statusColor}`}>
          {status}
        </div>
      );
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

      return (
        <div className={`capitalize font-semibold ${typeColor}`}>{type}</div>
      );
    },
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
          <ProjectCE />
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
      const deleteProjectMutation = useMutation(projectDeletedRequest, {
        onSuccess: () => {
          queryClient.invalidateQueries("projects");
          toast({
            variant: "success",
            title: "Success",
            description: "project deleted successfully.",
            duration: 900,
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Failed to delete project.",
            duration: 900,
          });
        },
      });
      return (
        <Trash
          onClick={() => deleteProjectMutation.mutate(row.original.id)}
          size={20}
          className="cursor-pointer"
        />
      );
    },
  },
];

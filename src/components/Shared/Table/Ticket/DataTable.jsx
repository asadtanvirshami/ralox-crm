"use client";

import * as React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { formAtom } from "@/jotai/atoms/formAtom";
import { Edit } from "lucide-react";
import { useSetAtom } from "jotai";
import { ComponentDialog } from "../../Dialog";
import TicketCE from "../../Forms/Ticket/TicketCE";
import { useMutation, useQueryClient } from "react-query";
import { ticketDeleteRequest } from "@/api/ticket";
import { toast } from "@/components/ui/use-toast";

const DataTable = ({ data, isLoading, totalCount }) => {
  const setState = useSetAtom(formAtom);
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation(ticketDeleteRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("ticket");
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
    <div className="w-full mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll h-[70vh]">
        {data?.map((val, ind) => {
          return (
            <div
              key={ind}
              className="p-4 border-2 border-[#e4e4e7] rounded bg-[#f4f4f5]"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-[#09090B] mb-2">
                  {val?.title}
                  <span className="text-xs ml-2">({val?.serial})</span>
                </h1>
                <span
                  className={`text-xs border-2 ${
                    val?.approved ? "border-green-500" : "border-red-500"
                  } rounded-3xl p-1`}
                >
                  Approved
                </span>
              </div>
              <p className="h-[68px] overflow-hidden text-[#09090B]">
                {val?.description}
              </p>
              <div className="flex justify-between items-center">
                <div></div>
                <div className="flex gap-1">
                  <div>
                    <ComponentDialog
                      onClick={() => {
                        setState({ edit: true, value: val });
                      }}
                      onCancel={() => {
                        setState({ edit: false, value: null });
                      }}
                      trigger={<Edit size={20} />}
                    >
                      <TicketCE />
                    </ComponentDialog>
                  </div>
                  <div
                    onClick={() => {
                      deleteUserMutation.mutate(val.id);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 text-[red]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(DataTable);

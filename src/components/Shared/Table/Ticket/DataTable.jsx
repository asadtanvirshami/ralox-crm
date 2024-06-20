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
import { MoonLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

const DataTable = ({ data, isLoading, totalCount, handlePage, page }) => {
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

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePage(page - 1);
    }
  };

  const handleNextPage = () => {
    handlePage(page + 1);
  };
  return (
    <div className="w-full mt-3">
      {isLoading && (
        <div className="flex justify-center items-center">
          <MoonLoader />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll ">
        {data?.map((val, ind) => {
          return (
            <div
              key={ind}
              className="p-4 border-2 border-[#e4e4e7] rounded bg-[#f4f4f5] "
            >
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-[#09090B] mb-2">
                  {val?.title}
                  <span className="text-xs ml-2">({val?.serial})</span>
                </h1>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm">
            {page}
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(DataTable);

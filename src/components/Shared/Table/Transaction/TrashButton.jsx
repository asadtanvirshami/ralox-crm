import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Trash } from 'react-icons/fi';
import { toast } from 'react-toastify'; // Adjust this import according to your toast implementation
import leadDeletedRequest from 'path-to-your-api/leadDeletedRequest'; // Adjust the import path

const DeleteButton = ({ leadId }) => {
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
      onClick={() => deleteLeadMutation.mutate(leadId)}
      size={20}
      className="cursor-pointer"
    />
  );
};

export default DeleteButton;

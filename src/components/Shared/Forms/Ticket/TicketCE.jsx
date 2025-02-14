"use client";
import React, { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { useMutation, useQueryClient } from "react-query";
import { userSignupRequest, userUpdateRequest } from "@/api/auth";
import { ticketCreateRequest, ticketUpdateRequest } from "@/api/ticket/index";
import { formAtom } from "@/jotai/atoms/formAtom";
import { useAtom } from "jotai";
import { Textarea } from "@/components/ui/textarea";
import { userAtom } from "@/jotai/atoms/userAtom";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  serial: z.string(),
  approved: z.boolean(),
  approved_by: z.string(),
  closed: z.boolean(),
  created_by: z.string(),
});

const TicketCE = () => {
  let [{ value, edit }] = useAtom(formAtom);
  let [{ id, designation }] = useAtom(userAtom);

  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      serial: "",
      approved: false,
      approved_by: "",
      closed: false,
      created_by: id,
    },
  });

  useMemo(() => {
    if (edit) {
      form.reset({
        id: value?.id,
        title: value?.title || "",
        description: value?.description || "",
        serial: value?.serial || "",
        approved: value?.approved || false,
        approved_by: value?.approved_by || "",
        closed: value?.closed || false,
        created_by: value?.created_by || "",
      });
    }
  }, [edit]);

  const createTicketMutation = useMutation(ticketCreateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("ticket");
      toast({
        variant: "success",
        title: "Success",
        description: "Ticket created successfully.",
        duration: 900,
      });
      value = {};
      edit = false;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to create Ticket.",
        duration: 900,
      });
    },
  });

  const updateTicketMutation = useMutation(ticketUpdateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("ticket");
      toast({
        variant: "success",
        title: "Success",
        description: "Ticket updated successfully.",
        duration: 900,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to update Ticket.",
        duration: 900,
      });
    },
  });

  const onSubmit = async (values) => {
    await createTicketMutation.mutate(values);
  };

  const onEdit = async (values) => {
    const newData = {
      id: value?.id,
      title: value?.title,
      description: value?.description,
      approved: value?.approved,
      approved_by: designation == "Manager" ? id : value?.approved_by,
      closed: value?.closed,
      ...values,
    };

    if (newData?.approved) {
      newData.approved_by = designation == "Manager" ? id : value?.approved_by;
    }
    await updateTicketMutation.mutate(newData);
  };

  return (
    <div className="w-full">
      <div className="space-y-8 justify-center">
        <div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(edit ? onEdit : onSubmit)}
                className="space-y-6 w-full"
              >
                <div className="grid grid-cols-1 space-x-3">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Software CRM Project"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 space-x-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            type={"text"}
                            placeholder="Type here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {edit == true && designation == "Manager" && (
                  <div className="grid grid-cols-1 space-x-3">
                    <FormField
                      control={form.control}
                      name="approved"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2">
                            <FormLabel className="mt-1">Approved</FormLabel>
                            <FormControl>
                              <Switch
                                id="approved"
                                {...field}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  // disabled={
                  //   createSaleMutation.isLoading
                  //     ? true
                  //     : false || updateUserMutation.isLoading
                  //     ? true
                  //     : false
                  // }
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TicketCE);

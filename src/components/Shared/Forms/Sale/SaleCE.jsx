"use client";
import React, { useCallback, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image'; //

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
import { formAtom } from "@/jotai/atoms/formAtom";
import { useAtom } from "jotai";
import { Textarea } from "@/components/ui/textarea";
import { SeparatorVertical } from "lucide-react";

const formSchema = z.object({
  sale_type: z.string().min(1, {
    message: "Type is required.",
  }),
  day: z.string().min(1, {
    message: "Day is required.",
  }),
  month: z.string().min(1, {
    message: "Month is required.",
  }),
  amount: z.coerce.number().min(0.01, {
    message: "Amount must be a positive number.",
  }),
  remaining: z.coerce.number().min(0.0, {
    message: "Remaining must be a non-negative number.",
  }),
  total: z.coerce.number().min(0.01, {
    message: "Total must be a positive number.",
  }),
  deadline: z.string().min(1, {
    message: "Deadline is required.",
  }),
  user: z.string().min(1, {
    message: "User is required.",
  }),
  time: z.string().min(1, {
    message: "Time is required.",
  }),
});

const SaleCE = () => {
  const [files, setFiles] = React.useState([]);
  let [{ value, edit }] = useAtom(formAtom);

  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sale_type: "",
      day: "",
      month: "",
      amount: 0.0,
      remaining: 0.0,
      total: 0.0,
      deadline: "",
      user: "",
      time: "",
      date: new Date(),
    },
  });

  const month = [
    { id: 0, month: "January" },
    { id: 1, month: "Feburary" },
    { id: 2, month: "March" },
    { id: 3, month: "April" },
    { id: 4, month: "May" },
    { id: 5, month: "June" },
    { id: 6, month: "July" },
    { id: 7, month: "August" },
    { id: 8, month: "September" },
    { id: 9, month: "October" },
    { id: 10, month: "November" },
    { id: 11, month: "December" },
  ];
  const day = [
    { id: 0, day: "Monday" },
    { id: 1, day: "Tuesday" },
    { id: 2, day: "Wednesday" },
    { id: 3, day: "Thursday" },
    { id: 4, day: "Friday" },
    { id: 5, day: "Saturday" },
    { id: 6, day: "Sunday" },
  ];

  useMemo(() => {
    if (edit) {
      form.reset({
        id: value?.id,
        name: value?.name || "",
        email: value?.email || "",
        designation: value?.ProfileInfo?.designation || "",
        phone: value?.ProfileInfo?.phone || "",
        has_salary: value?.has_salary || false,
        has_commission: value?.has_commission || false,
        has_allowance: value?.has_allowance || false,
        allowance_amount: value?.Allowance?.amount || null,
        allowance_type: value?.Allowance?.allowance_type || "",
        salary_amount: value?.Salary?.amount || null,
        commission_rate: value?.CommissionRate?.rate || null,
        authorized: value?.ProfileInfo?.authorized || false,
        warning: value?.ProfileInfo?.warning || false,
        password: value?.password || "",
        user: value?.role || "",
        blocked: value?.blocked || false,
        address: value?.ProfileInfo?.address || "",
        joined: value?.ProfileInfo?.joined
          ? new Date(value.ProfileInfo.joined)
          : null,
      });
    }
  }, [edit]);

  const createSaleMutation = useMutation(userSignupRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("sales");
      toast({
        variant: "success",
        title: "Success",
        description: "Sale created successfully.",
        duration: 900,
      });
      value = {};
      edit = false;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to create sale.",
        duration: 900,
      });
    },
  });

  const updateUserMutation = useMutation(userUpdateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("sales");
      toast({
        variant: "success",
        title: "Success",
        description: "Sale updated successfully.",
        duration: 900,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to update sale.",
        duration: 900,
      });
    },
  });

  const onSubmit = async (values) => {
    await createSaleMutation.mutate(values);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const thumbs = files.map(file => (
    <div key={file.name} className="flex justify-center items-center p-2">
      <Image
        src={file.preview}
        alt={file.name}
        width={100}
        height={100}
        className="rounded"
        onLoad={() => { URL.revokeObjectURL(file.preview); }}
      />
    </div>
  ));

  const onEdit = async (values) => {
    const newData = {
      id: value?.id,
      profileInfoId: value?.ProfileInfo?.id,
      commissionRateId: value?.CommissionRate?.id,
      salaryId: value?.Salary?.id,
      allowanceId: value?.Allowance?.id,
      ...values,
    };
    await updateUserMutation.mutate(newData);
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
                <div className="grid grid-cols-2 space-x-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
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
                <div className="grid grid-cols-4 space-x-3">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type={"number"}
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Amount</FormLabel>
                        <FormControl>
                          <Input
                            type={"number"}
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sale_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type of this sale" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Upfront">Upfront</SelectItem>
                            <SelectItem value="Upsell">Upsell</SelectItem>
                            <SelectItem value="Cross-sell">
                              Cross-sell
                            </SelectItem>
                            <SelectItem value="Remaining">Remaining</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You can select type of this sale.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-5 space-x-3 ">
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {day.map((item) => {
                              return (
                                <SelectItem key={item.id} value={item.day}>
                                  {item.day}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {month.map((item) => {
                              return (
                                <SelectItem key={item.id} value={item.month}>
                                  {item.month}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <br />
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <hr></hr>
                <div className="">
                  <div className="container mx-auto p-4">
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-md p-4 text-center ${
                        isDragActive
                          ? "border-blue-400 bg-blue-100"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <UploadCloud
                        className="mx-auto mb-4 text-gray-400"
                        size={48}
                      />
                      <p className="text-gray-600">
                        Drag & drop some files here, or click to select files
                      </p>
                    </div>
                    <aside className="flex flex-wrap mt-4">{thumbs}</aside>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={
                    createSaleMutation.isLoading
                      ? true
                      : false || updateUserMutation.isLoading
                      ? true
                      : false
                  }
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

export default React.memo(SaleCE);

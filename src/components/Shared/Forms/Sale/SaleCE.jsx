"use client";
import React, { useCallback, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import Image from "next/image"; //

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
import AddRow from "../../AddRow";
import SelectLead from "../../Select/Leads";
import SelectService from "../../Select/Service";
import { saleCreateRequest } from "@/api/sale";
import { userAtom } from "@/jotai/atoms/userAtom";
import moment from "moment";
import { unitAtom } from "@/jotai/atoms/unitAtom";

const formSchema = z.object({
  lead_id: z.string().min(1, {
    message: "Lead is required.",
  }),
  service_id: z.string().min(1, {
    message: "Service is required.",
  }),
  day: z.string().min(1, {
    message: "Day is required.",
  }),
  month: z.string().min(1, {
    message: "Month is required.",
  }),
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  amount: z.coerce.number().min(0.01, {
    message: "Amount must be a positive number.",
  }),
  user_id: z.string().min(1, {
    message: "User is required.",
  }),
  unit_id: z.string().min(1, {
    message: "Unit is required.",
  }),
  date: z.date({
    required_error: "A date of joining is required.",
  }),
});

const SaleCE = () => {
  const [files, setFiles] = React.useState([]);
  const [rows, setRows] = React.useState([{ amount: "", type: "" }]);
  const [unitFilters, setUnitFilter] = React.useState([]);

  let [{ value, edit }] = useAtom(formAtom);
  let [{ id }] = useAtom(userAtom);
  let [unit] = useAtom(unitAtom);

  const currentDate = new Date();
  const currentDay = moment().format("dddd");
  const currentMonth = moment().format("MMMM");
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: currentDay,
      month: currentMonth,
      amount: 0.0,
      user_id: id || "",
      service_id: "",
      lead_id: "",
      unit_id: ""||null,
      type: "",
      date: currentDate,
    },
  });

  React.useEffect(() => {
    setUnitFilter(unit);
  }, []);

  const type = [
    { id: 0, type: "Front-Sell" },
    { id: 1, type: "Cross-Sell" },
    { id: 2, type: "Up-Sell" },
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

  const createSaleMutation = useMutation(saleCreateRequest, {
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
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const thumbs = files.map((file) => (
    <div key={file.name} className="flex justify-center items-center p-2">
      <Image
        src={file.preview}
        alt={file.name}
        width={100}
        height={100}
        className="rounded"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
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

  const handleAddRow = (newRow) => {
    setRows([...rows, newRow]);
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
                <div className="grid grid-cols-3 space-x-3">
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
                  <SelectLead form={form} name={"lead_id"} />
                  <SelectService form={form} name={"service_id"} />
                </div>
                <div className="grid grid-cols-2 space-x-3">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type of this transaction" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {type.map((item) => {
                              return (
                                <SelectItem key={item.id} value={item.type}>
                                  {item.type}
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
                    name="unit_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a unit of this sale" />
                            </SelectTrigger>
                          </FormControl>
                          {unitFilters.length > 0 && (
                            <SelectContent>
                              {unitFilters.map((item) => {
                                return (
                                  <SelectItem value={item.id} key={item.id}>
                                    {item.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          )}
                        </Select>
                        <FormDescription>
                          Select unit of this sale.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <hr></hr>
                {/* <div className="">
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
                </div> */}
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

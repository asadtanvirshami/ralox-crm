"use client";
import React, { useMemo } from "react";

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

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { useMutation, useQueryClient } from "react-query";
import { saleCreateRequest } from "@/api/sale";

import { formAtom } from "@/jotai/atoms/formAtom";
import { userAtom } from "@/jotai/atoms/userAtom";
import { useAtom } from "jotai";

import SelectSale from "../../Select/Sale";
import UploadImg from "../../UploadImg/UploadImg";
import moment from "moment";
import { transactionCreateRequest } from "@/api/transaction";

const formSchema = z.object({
  sale_id: z.string().min(1, {
    message: "SaleID is required.",
  }),
  day: z.string().min(1, {
    message: "Day is required.",
  }),
  month: z.string().min(1, {
    message: "Month is required.",
  }),
  acc_no: z.string().min(1, {
    message: "Account is required.",
  }),
  img: z.any(),
  payment_method: z.string().min(1, {
    message: "Payment is required.",
  }),
  outstanding: z.string().min(1, {
    message: "Outstanding is required.",
  }),
  amount: z.coerce.number().min(0.01, {
    message: "Amount must be a positive number.",
  }),
  user_id: z.string().min(1, {
    message: "User is required.",
  }),
  time: z.string(),
  date: z.date({
    required_error: "A date of joining is required.",
  }),
});

const TransactionCE = () => {
  const [rows, setRows] = React.useState([{ amount: "", type: "" }]);
  const [files, setFiles] = React.useState([]);

  let [{ value, edit }] = useAtom(formAtom);
  let [{ id }] = useAtom(userAtom);

  const currentDate = new Date();
  const currentDay = moment().format("dddd");
  const currentMonth = moment().format("MMMM");
  const formattedTime = moment(currentDate).format("HH:mm:ss");

  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: currentDay,
      month: currentMonth,
      date: currentDate,
      time: formattedTime,
      amount: 0.0,
      outstanding: 0.0,
      user_id: id || "",
      acc_no: "",
      payment_method: "",
      img: null,
      sale_id: "",
    },
  });

  const paymentMethod = [
    { id: 0, name: "PayPal" },
    { id: 1, name: "Cashapp" },
    { id: 2, name: "Bank-Account" },
    { id: 3, name: "Stripe" },
    { id: 4, name: "Venmo" },
    { id: 5, name: "Skrill" },
    { id: 6, name: "Wire-Transfer" },
  ];

  useMemo(() => {
    if (edit) {
      form.reset({
        id: value?.id,
        sale_id: value?.sale_id,
        time: value?.time,
        img: value?.img,
        month: value?.month,
        day: value?.day,
        payment_method: value?.payment_method,
        outstanding: value?.outstanding,
        acc_no: value?.acc_no,
        amount: value?.amount,
        date: value?.date ? new Date(value.date) : null,
      });
    }
  }, [edit]);

  const createTransactionMutation = useMutation(transactionCreateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
      toast({
        variant: "success",
        title: "Success",
        description: "Transaction created successfully.",
        duration: 900,
      });
      value = {};
      edit = false;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Transaction to create sale.",
        duration: 900,
      });
    },
  });

  const updateUserMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
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
    await createTransactionMutation.mutate(values);
  };

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

  const handleUpload = (e) => {};

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
                  <FormField
                    control={form.control}
                    name="outstanding"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outstanding</FormLabel>
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
                  <SelectSale
                    form={form}
                    serial={value?.Sale?.serial || null}
                    name={"sale_id"}
                  />
                </div>
                <div className="grid grid-cols-3 space-x-3 ">
                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a payment method of this transaction" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethod.map((item) => {
                              return (
                                <SelectItem key={item.id} value={item.name}>
                                  {item.name}
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
                    name="acc_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account or Tag</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="@tag or PKW-9906999888"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <hr></hr>
                <div className="">
                  <div className="container mx-auto p-4">
                    <FormField
                      control={form.control}
                      name="img"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmation Screenshot</FormLabel>
                          <FormControl>
                            <UploadImg form={form} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  // disabled={
                  //   createTransactionMutation.isLoading
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

export default React.memo(TransactionCE);

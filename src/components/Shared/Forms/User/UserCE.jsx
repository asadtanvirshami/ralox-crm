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
import { formAtom } from "@/jotai/atoms/formAtom";
import { useAtom } from "jotai";
import { Badge } from "@/components/ui/badge";
import { unitAtom } from "@/jotai/atoms/unitAtom";

const formSchema = z.object({
  id:z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  designation: z.string().min(1, {
    message: "Password must be defiend.",
  }),
  has_commission: z.boolean().default(false),
  has_allowance: z.boolean().default(false),
  has_salary: z.boolean().default(false),
  blocked: z.boolean().default(false),
  allowance_amount: z.coerce.number().multipleOf(0.01),
  allowance_type: z.string(),
  salary_amount: z.coerce.number().multipleOf(0.01),
  commission_rate: z.coerce.number().multipleOf(0.01),
  warning: z.boolean().default(false),
  authorized: z.boolean().default(false),
  phone: z
    .string()
    .min(11, {
      message: "Phone must be valid to 11 digits",
    })
    .max(11, { message: "Phone must be valid to 11 digits" }),
  address: z.string(),
  serial: z.string(),
  role: z.string().min(1, {
    message: "Role is required.",
  }),
  joined: z.date({
    required_error: "A date of joining is required.",
  }),
  unit_id: z.string()
});

const UserCE = () => {
  let [{ value, edit }] = useAtom(formAtom);
  const [unitFilters, setUnitFilter] = React.useState([]);

  let [unit] = useAtom(unitAtom);

  React.useEffect(() => {
    setUnitFilter(unit);
  }, []);

  console.log(value);

  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id:'',
      name: "",
      email: "",
      designation: "",
      phone: "",
      serial: "",
      has_allowance: false,
      has_salary: false,
      has_commission: false,
      allowance_amount: 0.0,
      allowance_type: "",
      salary_amount: 0.0,
      commission_rate: 0.0,
      blocked: false,
      authorized: false,
      warning: false,
      password: "",
      role: "",
      address: "",
      unit_id: "",
      joined: new Date(),
    },
  });

  useMemo(() => {
    if (edit) {
      form.reset({
        id: value?.id || "",
        name: value?.name || "",
        email: value?.email || "",
        serial: value?.serial || "",
        designation: value?.ProfileInfo?.designation || "",
        phone: value?.ProfileInfo?.phone || "",
        unit_id: value?.unit_id || "",
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
        role: value?.role || "",
        blocked: value?.blocked || false,
        address: value?.ProfileInfo?.address || "",
        joined: value?.ProfileInfo?.joined
          ? new Date(value.ProfileInfo.joined)
          : null,
      });
    }
  }, [edit]);

  const createUserMutation = useMutation(userSignupRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast({
        variant: "success",
        title: "Success",
        description: "User created successfully.",
        duration: 900,
      });
      value = {};
      edit = false;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to create user.",
        duration: 900,
      });
    },
  });

  const updateUserMutation = useMutation(userUpdateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast({
        variant: "success",
        title: "Success",
        description: "User updated successfully.",
        duration: 900,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to update user.",
        duration: 900,
      });
    },
  });

  const onSubmit = async (values) => {
    await createUserMutation.mutate(values);
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>#Serial</FormLabel>
                        <FormControl>
                          <Input
                            disabled={true}
                            type={"text"}
                            className="border-none font-semibold shadow-none text-xl"
                            placeholder="eg.UR-4401"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 space-x-3 ">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type={"email"}
                            placeholder="@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="Block I, North Nazimabad"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone.No</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="+92 4462 2838"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-8">
                  <FormField
                    control={form.control}
                    name="has_commission"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormLabel className="mt-1">Commission</FormLabel>
                          <FormControl>
                            <Switch
                              id="has_commission"
                              {...field}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Turn on if user pay is commission.
                        </FormDescription>
                        <FormMessage />
                        {form.getValues().has_commission && (
                          <FormField
                            control={form.control}
                            name="commission_rate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Commission Rate</FormLabel>
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
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="has_salary"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormLabel className="mt-1">Salary</FormLabel>
                          <FormControl>
                            <Switch
                              id="has_salary"
                              {...field}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Turn on if user pay is salary.
                        </FormDescription>
                        <FormMessage />
                        {form.getValues().has_salary && (
                          <FormField
                            control={form.control}
                            name="salary_amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Salary Amount</FormLabel>
                                <FormControl>
                                  <Input
                                    type={"number"}
                                    placeholder="0"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="has_allowance"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormLabel className="mt-1">Allowance</FormLabel>
                          <FormControl>
                            <Switch
                              id="has_allowance"
                              {...field}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Turn on if user has allowance.
                        </FormDescription>
                        <FormMessage />
                        {form.getValues().has_allowance && (
                          <>
                            <FormField
                              control={form.control}
                              name="allowance_amount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Allowance Amount</FormLabel>
                                  <FormControl>
                                    <Input
                                      type={"number"}
                                      placeholder="0"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="allowance_type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Allowance Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="bonus">
                                        Bonus
                                      </SelectItem>
                                      <SelectItem value="travel">
                                        Travel
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    You can set a type for this allowance.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="blocked"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormLabel className="mt-1">Blocked</FormLabel>
                          <FormControl>
                            <Switch
                              id="blocked"
                              {...field}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Turn on if user is blocked.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="authorized"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormLabel className="mt-1">Authorized</FormLabel>
                          <FormControl>
                            <Switch
                              id="authorized"
                              {...field}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Turn on if user is admin and authorized.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="warning"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormLabel className="mt-1">Warning</FormLabel>
                          <FormControl>
                            <Switch
                              id="warning"
                              {...field}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Turn on if user is on warning.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 space-x-3 ">
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a designation of this user" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Sales Executive">
                              Sales Executive
                            </SelectItem>
                            <SelectItem value="Senior Sales Executive">
                              Senior Sales Executive
                            </SelectItem>
                            <SelectItem value="P (President)">
                              P (President)
                            </SelectItem>
                            <SelectItem value="VP (Vice President)">
                              VP (Vice President)
                            </SelectItem>
                            <SelectItem value="AVP (Assistant Vice President)">
                              AVP (Assistant Vice President)
                            </SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="HR (Human Resource)">
                              HR (Human Resource)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You can manage designation of this user.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role of this user" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="super-admin">
                              Super-Admin
                            </SelectItem>
                            <SelectItem value="agent">Agent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You can manage role of this user.
                        </FormDescription>
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
                              <SelectValue placeholder="Select a unit of this user" />
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
                          You can manage unit of this user.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="#$wsoxp"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="joined"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joined</FormLabel>
                      <br />
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[10rem] pl-3 text-left font-normal",
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
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={
                    createUserMutation.isLoading
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

export default React.memo(UserCE);

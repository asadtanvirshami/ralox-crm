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
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { useMutation, useQueryClient } from "react-query";
import { leadCreateRequest, leadUpdateRequest } from "@/api/lead";

import { formAtom } from "@/jotai/atoms/formAtom";
import { userAtom } from "@/jotai/atoms/userAtom";
import { useAtom } from "jotai";
import { unitAtom } from "@/jotai/atoms/unitAtom";

const formSchema = z.object({
  serial: z.string(),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(100, {
    message: "Description must be at least 100 characters.",
  }),
  post: z.string().min(1, {
    message: "Post must be at least 1 characters.",
  }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  source_link: z.string().min(1, {
    message: "Source Link is required.",
  }),
  source: z.string().min(1, {
    message: "Source is required.",
  }),
  query: z.string().min(1, {
    message: "Query is required.",
  }),
  comments: z.string().min(1, {
    message: "Comment is required.",
  }),
  potential: z.string().min(1, {
    message: "Potential is required.",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  phone: z
    .string()
    .min(11, {
      message: "Phone must be valid to 11 digits",
    })
    .max(11, { message: "Phone must be valid to 11 digits" }),
  unit_id: z.string(),
  user_id: z.string(),
  date: z.date({
    required_error: "A date of joining is required.",
  }),
  day: z.string({
    required_error: "Day is required",
  }),
  month: z.string({
    required_error: "Month is required",
  }),
});

const LeadCE = () => {
  const type = [
    { id: 0, type: "Cold Lead" },
    { id: 1, type: "Warm Lead" },
    { id: 2, type: "Fresh Lead" },
  ];
  const potential = [
    { id: 0, potential: "High" },
    { id: 1, potential: "Medium" },
    { id: 2, potential: "Low" },
  ];
  const status = [
    { id: 0, status: "Converted" },
    { id: 1, status: "Not Converted" },
  ];
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

  let [{ value, edit }] = useAtom(formAtom);
  const [campaign, setCampaign] = React.useState([]);
  let [unit] = useAtom(unitAtom);
  let [{ id }] = useAtom(userAtom);

  React.useEffect(() => {
    setCampaign(unit);
  }, []);

  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial: "",
      title: "",
      name: "",
      description: "",
      post: "",
      status: "",
      potential: "",
      type: "",
      city: "",
      country: "",
      source_link: "",
      source: "",
      comments: "",
      email: "",
      phone: "",
      unit_id: "" || "",
      user_id: id || "",
    },
  });

  useMemo(() => {
    if (edit) {
      form.reset({
        title: value?.title || "",
        serial: value?.serial || "",
        source: value?.source || "",
        source_link: value?.source_link || "",
        potential: value?.potential || "",
        type: value?.type || "",
        name: value?.name || "",
        status: value?.status || "",
        query: value?.query || "",
        phone: value?.phone || "",
        email: value?.email || "",
        city: value?.city || "",
        country: value?.country || "",
        unit_id: value?.unit_id || "",
        user_id: id || "",
        post: value?.post || "",
        description: value?.description || "",
        comments: value?.comments || "",
        day: value?.day || "",
        date: value?.date ? new Date(value?.date) : null,
        month: value?.month || "",
      });
    }
  }, [edit]);

  const leadCreateMutation = useMutation(leadCreateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("leads");
      toast({
        variant: "success",
        title: "Success",
        description: "Lead created successfully.",
        duration: 900,
      });
      value = {};
      edit = false;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to create lead.",
        duration: 900,
      });
    },
  });

  const updateLeadMutation = useMutation(leadUpdateRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("leads");
      toast({
        variant: "success",
        title: "Success",
        description: "Lead updated successfully.",
        duration: 900,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to update lead.",
        duration: 900,
      });
    },
  });

  const onSubmit = async (values) => {
    await leadCreateMutation.mutate(values);
  };

  const onEdit = async (values) => {
    const newValues = { ...values, id: value?.id };
    await updateLeadMutation.mutate(newValues);
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Website Project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="Bark, Upwork, LinkedIn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="source_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Link</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="www.linkedIn.com/user"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 space-x-3 ">
                  <FormField
                    control={form.control}
                    name="potential"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potential</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a potential of this lead" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {potential.map((item) => {
                              return (
                                <SelectItem
                                  key={item.id}
                                  value={item.potential}
                                >
                                  {item.potential}
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
                              <SelectValue placeholder="Select a type of this lead" />
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
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status of this lead" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {status.map((item) => {
                              return (
                                <SelectItem key={item.id} value={item.status}>
                                  {item.status}
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
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Query</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="Looking for website."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-6 space-x-3 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="John Doe"
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
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="+1 (401)-34422-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type={"email"}
                            placeholder="johnDoe@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="Virgirnia"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="Unite States"
                            {...field}
                          />
                        </FormControl>
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
                              <SelectValue placeholder="Select a unit of this lead" />
                            </SelectTrigger>
                          </FormControl>
                          {campaign.length > 0 && (
                            <SelectContent>
                              {campaign.map((item) => {
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
                          You can manage unit of this lead.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 space-x-3 ">
                  <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            placeholder="looking for website"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              <SelectValue placeholder="Select a day of this lead" />
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
                              <SelectValue placeholder="Select a month of this lead" />
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
                <div className="grid grid-cols-2 space-x-3 ">
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
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
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
                <Button
                  type="submit"
                  disabled={
                    leadCreateMutation.isLoading
                      ? true
                      : false || updateLeadMutation.isLoading
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

export default React.memo(LeadCE);

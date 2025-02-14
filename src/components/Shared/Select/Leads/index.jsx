import React, { useEffect } from "react";
import debounce from "lodash.debounce";

import { useQuery } from "react-query";
import { leadGetRequest } from "@/api/lead";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CommandList } from "cmdk";
import { Input } from "@/components/ui/input";

const SelectLead = ({ form, name, checkList, isCheck, setIsCheck }) => {
  const [value, setValue] = React.useState("");
  const [query, setQuery] = React.useState({
    id: "",
    user_id: "",
    unit_id: "",
    type: "",
    month: "",
    potential: "",
    date: "",
    status: "",
    type: "",
    serial: "",
    page: 1,
    pageSize: 8,
  });
  const [leads, setLeads] = React.useState([]);

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: [
      "leads",
      query.page,
      query.pageSize,
      query.id,
      query.user_id,
      query.unit_id,
      query.status,
      query.month,
      query.potential,
      query.type,
      query.serial,
    ],
    queryFn: () =>
      leadGetRequest(
        query.page,
        query.pageSize,
        query.id,
        query.user_id,
        query.unit_id,
        query.status,
        query.month,
        query.potential,
        query.type,
        query.serial
      ),
    onSuccess: (data) => {
      if (leads.length == 0) setLeads(data.data);
    },
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });

  const handleScroll = debounce(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 400 &&
      users.length < totalUsers
    ) {
      setQuery((prevPage) => prevPage + 1);
      if (leads.length > 0) setLeads([...leads, ...data.data]);
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to add and remove the listener only once

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Lead</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button className="w-full" variant="outline" role="combobox">
                  {value || "Select Lead..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <Input
                  onChange={(event) =>
                    setQuery({
                      ...query,
                      serial: event.target.value,
                    })
                  }
                  placeholder="Search Lead..."
                  className="h-9"
                />
                <CommandEmpty>No Lead found.</CommandEmpty>
                {data !== undefined && (
                  <CommandGroup onScroll={handleScroll}>
                    {leads.map((item) => {
                      return (
                        <CommandList>
                          <CommandItem
                            onSelect={() => {
                              form.setValue("lead_id", item.id);
                              setValue(item.serial);
                            }}
                            value={item.id}
                            key={item.id}
                          >
                            {item.serial}
                          </CommandItem>
                        </CommandList>
                      );
                    })}
                    {isFetching && (
                      <div className="flex justify-center ">
                        <Loader2 className=" text-blue-300 animate-spin" />
                      </div>
                    )}
                  </CommandGroup>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectLead;

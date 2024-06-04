import React, { useEffect } from "react";
import debounce from "lodash.debounce";

import { useQuery, keepPreviousData } from "react-query";
import { serviceGetRequest } from "@/api/service";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const SelectService = ({ form, name, checkList, isCheck, setIsCheck }) => {
  const [value, setValue] = React.useState("");
  const [query, setQuery] = React.useState({
    page: 1,
    pageSize: 10,
  });
  const [services, setServices] = React.useState([]);

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["service", query.page, query.pageSize],
    queryFn: () => serviceGetRequest(query.page, query.pageSize),
    onSuccess: (data) => {
      if (services.length == 0) setServices(data.data.data);
      if (services.length > 0) setServices([...services, ...data.data.data]);
    },
    refetchInterval: false,
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });

  const handleScroll = debounce(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 400 &&
      services.length < data?.data?.totalCount
    ) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        page: prevQuery.page + 1,
      }));
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
          <FormLabel>Service</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                  variant="outline"
                  role="combobox"
                >
                  {value || "Select Service..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full h-[15rem] p-0">
              <Command>
                {/* <Input
                  onChange={(event) =>
                    setQuery({
                      ...query,
                      name: event.target.name,
                    })
                  }
                  placeholder="Search service..."
                  className="h-9"
                /> */}
                <CommandEmpty>No service found.</CommandEmpty>
                {data !== undefined && (
                  <CommandGroup
                    onScroll={handleScroll}
                    className=" overflow-y-auto"
                  >
                    {services.map((item) => {
                      return (
                        <CommandList>
                          <CommandItem
                            onSelect={() => {
                              form.setValue("service_id", item.id);
                              setValue(item.name);
                            }}
                            value={item.id}
                            key={item.id}
                          >
                            {item.name}
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
        </FormItem>
      )}
    />
  );
};

export default SelectService;

"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";

import { MoonLoader } from "react-spinners";
import { Download, FilterX } from "lucide-react";

import moment from "moment";
import { CSVDownload, CSVLink } from "react-csv";

const DataTable = ({
  columns,
  data,
  query,
  isLoading,
  setQuery,
  totalCount,
}) => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleNextPage = () => {
    // Assuming there's always a next page
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handlePreviousPage = () => {
    if (query.page > 1) {
      setQuery((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  const totalPages = Math.ceil(totalCount / query.pageSize);

  const getPagesToShow = () => {
    const currentPage = query.page;

    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2];
    } else if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const pagesToShow = getPagesToShow();

  const handlePageClick = (pageNumber, status) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setQuery((prev) => ({
        ...prev,
        page: pageNumber,
      }));
    }
  };

  const handleReset = () => {
    setQuery({
      ...query,
      name: "",
      date: "",
    });
  };

  const handleDateSelect = (selectedDate) => {
    const filteredDate = moment(selectedDate).format("YYYY-MM-DD");
    setQuery({ ...query, date: filteredDate }); // Update state with selected date
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Name..."
          value={query.name}
          onChange={(event) => setQuery({ ...query, name: event.target.value })}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Filter <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Calendar
              mode="single"
              selected={query.date}
              onSelect={handleDateSelect}
              className="rounded-md border shadow"
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="ml-2">
          <FilterX onClick={handleReset} />
        </Button>
        <Button variant="outline" className="ml-2 space-x-2">
          <CSVLink data={data}>Download</CSVLink>
          <Download size={17} />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <>
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {!isLoading && <>No results.</>}
                  {isLoading && (
                    <div className="animate-spin justify-center flex">
                      <MoonLoader size={22} />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={query.page === 1}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handlePageClick}>
            {pagesToShow.length > 0 ? pagesToShow : "0"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={(query.page === totalPages.length) == 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(DataTable);

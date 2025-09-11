"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Link } from "react-router-dom";

// ✅ keep only serializable row data
// const data = [
//   {
//     id: "m5gr84i9",
//     apiName: "Fastage API",
//     method: "GET",
//     price: "$0.01 per request",
//   },
//   {
//     id: "3u1reuv4",
//     apiName: "Vehical RC V2 API",
//     method: "POST",
//     price: "$0.01 per request",
//   },
//   {
//     id: "derv1ws0",
//     apiName: "Challan API",
//     method: "GET",
//     price: "$0.01 per request",
//   },
//   {
//     id: "5kma53ae",
//     apiName: "Addhar API",
//     method: "POST",
//     price: "$0.01 per request",
//   },
//   {
//     id: "bhqecj4p",
//     apiName: "PAN API",
//     method: "GET",
//     price: "$0.01 per request",
//   },
// ];
const data = [
  {
    id: "m5gr84i9",
    label: "Vehicle RC V2 API",
    url: "/api/rc/v2",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "e2WtaEJasQ5Maae3QpngD8IadCWFzhE28XeZ9bmB",
    },
    body: { vehicle_number: "text" },
    code: {
      Curl: `curl --location 'https://dev-api.innowave.solutions/rc/v2' \n\
    --header 'x-api-key: <api-key>' \n\
    --header 'Content-Type: application/json' \n\
    --data '{
        "vehicle_number": "vehicle_number_value"
    }'`,
    },
  },

  {
    id: "3u1reuv4",
    label: "Fastag API",
    url: "/api/rc/fastag-details",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "e2WtaEJasQ5Maae3QpngD8IadCWFzhE28XeZ9bmB",
    },
    body: { vehicle_number: "text" },
    code: {
      Curl: `curl --location 'https://dev-api.innowave.solutions/rc/fastag-details' \n\
          --header 'Content-Type: application/json' \n\
          --header 'x-api-key: <api-key>' \n\
          --data '{
            "vehicle_number": "vehicle_number_value"
            }'`,
    },
  },
  {
    id: "bhqecj4p",
    label: "Challan API",
    url: "/api/rc/challan-details",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "e2WtaEJasQ5Maae3QpngD8IadCWFzhE28XeZ9bmB",
    },
    body: { vehicle_number: "text" },
    code: {
      Curl: `curl --location 'https://dev-api.innowave.solutions/rc/challan-details' \n\
          --header 'Content-Type: application/json' \n\
          --header 'x-api-key: <apikey>' \n\
          --data '{
            "vehicle_number": "vehicle_number_value"
            }'`,
    },
  },
];

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ApiName <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("label")}</div>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("method")}</div>
    ),
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => <div className="capitalize">{row.getValue("url")}</div>,
  },
  {
    accessorKey: "test",
    header: "Test",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <Link to={`/devApi/test/${rowData.id}`} state={rowData}>
          <Button className="text-gray-800 border-1 bg-transparent hover:bg-gray-200">
            {" "}
            test
          </Button>
        </Link>
      );
    },
  },
];

export default function ApisList() {
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
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="min-h-screen px-4 py-10 w-screen md:w-[80%] mx-auto">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter apiName..."
          value={table.getColumn("label")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("label")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="h-28 text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

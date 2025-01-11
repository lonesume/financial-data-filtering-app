"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./column-header";

export type Statement = {
  date: string;
  symbol: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
};

// Define the shape of your data
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Statement>[] = [
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
    id: "actions", // Keep this column for custom rendering
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "symbol", // Maps to `Statement.symbol`
    header: "Symbol",
  },
  {
    accessorKey: "date", // Maps to `Statement.date`
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Email
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "revenue",
    // header: () => <div className="text-right">Revenue</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(revenue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "netIncome",
    // header: () => <div className="text-right">Revenue</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Income" />
    ),
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("netIncome"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(revenue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "grossProfit",
    // header: () => <div className="text-right">Revenue</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gross Profit" />
    ),
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("grossProfit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(revenue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "eps",
    // header: () => <div className="text-right">Revenue</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eps" />
    ),
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("eps"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(revenue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "operatingIncome",
    // header: () => <div className="text-right">Revenue</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Operating Income" />
    ),
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("operatingIncome"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(revenue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

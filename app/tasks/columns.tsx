"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment-timezone";

export type Task = {
  taskId: string;
  dueDate: string;
  status: "Due soon" | "Not urgent" | "Overdue" | "";
  taskName: string;
  taskDescription: string;
  createdAt: string;
};

const DEFAULT_TZ = "Asia/Kuala_Lumpur";

export const createColumns = (
  onEdit: (task: Task) => void
): ColumnDef<Task>[] => [
  {
    accessorKey: "taskId",
    header: "Task ID",
  },
  {
    accessorKey: "taskName",
    header: "Task Name",
  },
  {
    accessorKey: "taskDescription",
    header: "Task Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = moment(row.getValue("dueDate"))
        .tz(DEFAULT_TZ)
        .format("D MMM YYYY");
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Create At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = moment(row.getValue("createdAt"))
        .tz(DEFAULT_TZ)
        .format("D MMM YYYY");
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Button variant="link" onClick={() => onEdit(task)}>
          Edit
        </Button>
      );
    },
  },
];

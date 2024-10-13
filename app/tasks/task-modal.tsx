"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TaskForm from "./task-form";

interface TaskModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  refetch: () => void;
  initialValues: {
    taskId: string;
    taskName: string;
    taskDescription: string;
    dueDate: string;
  };
}

export default function TaskModal({
  isOpen,
  onOpen,
  onClose,
  refetch,
  initialValues,
}: TaskModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => onOpen()}>
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues.taskId ? "Edit Task" : "Create Task"}
          </DialogTitle>
          <DialogDescription>Click save when you're done</DialogDescription>
        </DialogHeader>
        <TaskForm
          onClose={onClose}
          refetch={refetch}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}

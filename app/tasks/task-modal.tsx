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
  modalVisibilityHandler: (status: boolean) => void;
  createTaskModalTrigger: () => void;
  isOpen: boolean;
  onCloseModalHandler: () => void;
  refetch: () => void;
  initialValues: {
    taskId: string;
    taskName: string;
    taskDescription: string;
    dueDate: string;
  };
}

export default function TaskModal({
  modalVisibilityHandler,
  createTaskModalTrigger,
  isOpen,
  onCloseModalHandler,
  refetch,
  initialValues,
}: TaskModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(status) => modalVisibilityHandler(status)}
    >
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => createTaskModalTrigger()}>
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues.taskId ? "Edit Task" : "Create Task"}
          </DialogTitle>
          <DialogDescription>Click save when done</DialogDescription>
        </DialogHeader>
        <TaskForm
          onClose={onCloseModalHandler}
          refetch={refetch}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}

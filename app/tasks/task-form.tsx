"use client";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createUserTask, updateUserTask } from "../api/tasks/route";

const FormSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task Name must be at least 2 characters.",
  }),
  taskDesc: z.string().min(2, {
    message: "Task Description must be at least 2 characters.",
  }),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
});

interface TaskFormProps {
  onClose: () => void;
  refetch: () => void;
  initialValues: {
    taskId: string;
    taskName: string;
    taskDescription: string;
    dueDate: string;
  };
}

export default function TaskForm({
  onClose,
  refetch,
  initialValues,
}: TaskFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      taskName: initialValues ? initialValues.taskName : "",
      taskDesc: initialValues ? initialValues.taskDescription : "",
      dueDate:
        initialValues && initialValues.dueDate
          ? new Date(initialValues.dueDate)
          : undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      ...initialValues,
      ...data,
      dueDate: moment(data.dueDate).format(),
    };

    if (initialValues.taskId) {
      if (
        formattedData.taskName === initialValues.taskName &&
        formattedData.taskDesc === initialValues.taskDescription &&
        formattedData.dueDate === moment(initialValues.dueDate).format()
      ) {
        toast({
          title: "No changes made",
          description: "Please modify the task before submitting.",
        });
        onClose();
        return;
      }
      const response = await updateUserTask(formattedData);
      if (response) {
        toast({
          title: "Task Updated!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        refetch();
        onClose();
        return;
      }
    }
    const response = await createUserTask(formattedData);

    if (response) {
      toast({
        title: "Task Created!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      refetch();
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="Task Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taskDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Descriptione</FormLabel>
              <FormControl>
                <Input placeholder="Task Descriptione" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Make sure to select a relistic date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

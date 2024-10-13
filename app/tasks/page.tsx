"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createColumns, Task } from "./columns";
import { DataTable } from "./data-table";
import { fetchUserTasks } from "../api/tasks/route";
import TaskModal from "./task-modal";
import { useState } from "react";

const queryClient = new QueryClient();

function TaskTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialValues, setModalInitialValues] = useState({
    taskId: "",
    dueDate: "",
    status: "",
    taskName: "",
    taskDescription: "",
    createdAt: "",
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["userTasks"],
    queryFn: fetchUserTasks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const openEditModal = (task: Task) => {
    setModalInitialValues(task);
    setIsModalOpen(true);
  };
  const columns = createColumns(openEditModal);
  return (
    <div className="container mx-auto py-10">
      <TaskModal
        isOpen={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        initialValues={modalInitialValues}
        refetch={refetch}
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default function TasksManager() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskTable />
    </QueryClientProvider>
  );
}

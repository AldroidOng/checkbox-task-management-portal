"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createColumns, Task } from "./columns";
import { DataTable } from "./data-table";
import { fetchUserTasks } from "../api/tasks/utils";
import TaskModal from "./task-modal";
import { useState } from "react";
import { taskActions } from "../types/task";

const queryClient = new QueryClient();
const INITIAL_VALUES: Task = {
  taskId: "",
  dueDate: "",
  status: "",
  taskName: "",
  taskDescription: "",
  createdAt: "",
};

function TaskTable() {
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    taskAction: taskActions;
  }>({
    isOpen: false,
    taskAction: undefined,
  });

  const [modalInitialValues, setModalInitialValues] =
    useState<Task>(INITIAL_VALUES);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["userTasks"],
    queryFn: fetchUserTasks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const modalVisibilityHandler = (openStatus: boolean) => {
    if (modalConfig.isOpen && modalConfig.taskAction && !openStatus) {
      setModalConfig({
        isOpen: openStatus,
        taskAction: undefined,
      });
      setModalInitialValues(INITIAL_VALUES);
    }
  };

  const createTaskModalTrigger = () => {
    setModalConfig({
      isOpen: true,
      taskAction: "CREATE",
    });
  };

  const openEditModal = (task: Task) => {
    setModalInitialValues(task);
    setModalConfig({
      isOpen: true,
      taskAction: "EDIT",
    });
  };

  const onCloseModalHandler = () => {
    setModalInitialValues(INITIAL_VALUES);
    setModalConfig({
      isOpen: false,
      taskAction: undefined,
    });
  };

  const columns = createColumns(openEditModal);
  return (
    <div className="container mx-auto py-10">
      <TaskModal
        modalVisibilityHandler={modalVisibilityHandler}
        createTaskModalTrigger={createTaskModalTrigger}
        isOpen={modalConfig.isOpen}
        onCloseModalHandler={onCloseModalHandler}
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

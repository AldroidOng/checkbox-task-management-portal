export interface createTaskPayload {
  email: string;
  taskName: string;
  taskDesc: string;
  dueDate: string;
}

export type submitNewTask = Omit<createTaskPayload, "email">;

export interface updateTaskPayload {
  email: string;
  taskId: string;
  taskName: string;
  taskDesc: string;
  dueDate: string;
}

export interface submitUpdateTask extends Omit<createTaskPayload, "email"> {
  taskId?: string;
}

export type taskActions = "CREATE" | "EDIT" | undefined;

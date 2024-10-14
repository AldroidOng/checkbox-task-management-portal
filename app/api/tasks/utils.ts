import {
  createTaskPayload,
  submitNewTask,
  submitUpdateTask,
  updateTaskPayload,
} from "@/app/types/task";
import axios from "axios";
import { apiConfig } from "./config";

const EMAIL = "user2@example.com";

export const fetchUserTasks = async () => {
  const response = await axios.get(
    `${apiConfig.apiBaseUrl}/task?email=${EMAIL}`
  );

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

export const createUserTask = async (data: submitNewTask) => {
  const payload: createTaskPayload = { ...data, email: EMAIL };
  const response = await axios.post(`${apiConfig.apiBaseUrl}/task`, payload);

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

export const updateUserTask = async (data: submitUpdateTask) => {
  const payload = { ...data, email: EMAIL } as updateTaskPayload;
  const response = await axios.patch(`${apiConfig.apiBaseUrl}/task`, payload);

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Network response was not ok");
  }

  return response.data;
};

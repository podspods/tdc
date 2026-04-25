import api, { type ApiResponse } from "../../api/client";
import type { CreateTaskDto, UpdateTaskDto, Task, TaskQueryParams, TaskStats } from "./task.types";

const BASE_URL = "/task";
//--------------------------------------------------------------------------------------------------------------------------

export async function _createTask(data: CreateTaskDto): Promise<ApiResponse<Task>> {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data as ApiResponse<Task>;
  } catch (error) {
    console.error("Failed to create task :", error);
    return { success: false, error: "Failed to create task" };
  }
}

//--------------------------------------------------------------------------------------------------------------------------
export async function _updateTask(id: number, data: UpdateTaskDto): Promise<ApiResponse<Task>> {
  try {
    const response = await api.put(`/task/${id}`, data);
    return response.data as ApiResponse<Task>;
  } catch (error) {
    console.error("Failed to update task:", error);
    return { success: false, error: "Failed to update task" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _taskList(params?: TaskQueryParams): Promise<ApiResponse<Task[]>> {
  try {
    const response = await api.get("/task", { params });
    if (response.data && response.data.success) {
      return {
        success: true,
        data: response.data || [],
        error: "",
      };
    }
    return { success: false, data: [], error: "failed to fetch task" };
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return { success: false, data: [], error: "failed to fetch task" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _taskStats(): Promise<ApiResponse<TaskStats>> {
  try {
    const response = await api.get("/task/stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch task stats:", error);
    return { success: false, error: "Failed to fetch task stats" };
  }
}
//--------------------------------------------------------------------------------------------------------------------------

export async function getTaskById(id: number): Promise<Task | null> {
  try {
    const response = await api.get(`/tasks/${id}`);
    if (response.data && response.data.success) {
      return response.data.data || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch task:", error);
    return null;
  }
}

export async function getTasksByOwner(ownerId: number): Promise<Task[]> {
  try {
    const response = await api.get(`/tasks/owner/${ownerId}`);
    if (response.data && response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch tasks by owner:", error);
    return [];
  }
}

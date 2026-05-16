import { apiRequest } from "../../api/apirequest";
import type { ApiResponse } from "../../common/commun.types";
import type { CreateTaskDto, UpdateTaskDto, Task, TaskQueryParams, TaskStats } from "./task.types";

const BASE_URL = "/task";
//--------------------------------------------------------------------------------------------------------------------------

export async function _createTask(data: CreateTaskDto): Promise<ApiResponse<Task>> {
  const url = `${BASE_URL}`;
  return apiRequest<Task>(url, "post", data);
}

//--------------------------------------------------------------------------------------------------------------------------
export async function _updateTask(id: number, data: UpdateTaskDto): Promise<ApiResponse<Task>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Task>(url, "put", data);
}
//--------------------------------------------------------------------------------------------------------------------------

export async function _taskList(params?: TaskQueryParams): Promise<ApiResponse<Task[]>> {
  const url = BASE_URL;
  return apiRequest<Task[]>(url, "get", params, []);
}
//--------------------------------------------------------------------------------------------------------------------------
export async function _taskStats(): Promise<ApiResponse<TaskStats>> {
  const url = `${BASE_URL}/stats`;
  return apiRequest<TaskStats>(url, "get");
}
//--------------------------------------------------------------------------------------------------------------------------

export async function getTaskById(id: number): Promise<ApiResponse<Task>> {
  const url = `${BASE_URL}/${id}`;
  return apiRequest<Task>(url, "get");
}

export async function getTasksByOwner(ownerId: number): Promise<ApiResponse<Task[]>> {
  const url = `${BASE_URL}/${ownerId}`;
  return apiRequest<Task[]>(url, "get", []);
}

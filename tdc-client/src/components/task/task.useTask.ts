import { useCallback, useState } from "react";
import type { CreateTaskDto, UpdateTaskDto, Task, TaskQueryParams, TaskStats } from "./task.types";
import { STATS_TASK_INIT, TASK_INIT } from "../../common/constant";
import { _createTask, _updateTask, _taskList, _taskStats } from "./task.service";

export function useTask() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>(STATS_TASK_INIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("init-no-error");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filters, setFilters] = useState<TaskQueryParams>({});

  //--------------------------------------------------------------------------------------------------------------------------

  const tasklist = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { ...filters, page, limit };
      const response = await _taskList(params);

      if (response.success) {
        setTaskList(response.data || []);
        setTotal(response.pagination?.total || 0);
      } else {
        setError(response.error || "Failed to load owners");
      }
    } catch (err) {
      setError("Failed to load owners");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  //--------------------------------------------------------------------------------------------------------------------------

  const taskStats = useCallback(async () => {
    try {
      const response = await _taskStats();
      if (response.success) {
        setStats(response.data || STATS_TASK_INIT);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------
  const createTask = useCallback(
    async (createTaskDto: CreateTaskDto): Promise<Task> => {
      setLoading(true);
      try {
        const response = await _createTask(createTaskDto);
        if (response.success && response.data) {
          await tasklist();
          await taskStats();
          return response.data;
        }
        setError(response.error || "Failed to create task");
        return TASK_INIT;
      } catch (error) {
        setError("Failed to create task");
        return TASK_INIT;
      } finally {
        setLoading(false);
      }
    },
    [tasklist, taskStats],
  );

  //--------------------------------------------------------------------------------------------------------------------------

  const updateTask = useCallback(
    async (id: number, task: UpdateTaskDto) => {
      console.log("updateTask task", task);
      console.log("updateTask id", id);
      setLoading(true);
      try {
        const response = await _updateTask(id, task);
        if (response.success) {
          await tasklist();
          await taskStats();
          return response.data;
        }
        setError(response.error || "Failed to update owner");
        return null;
      } catch (err) {
        setError("Failed to update owner");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [tasklist, taskStats],
  );
  //--------------------------------------------------------------------------------------------------------------------------

  function deleteTask() {}
  function searchTasks() {}
  //--------------------------------------------------------------------------------------------------------------------------

  return {
    taskList,
    loading,

    stats,
    error,
    total,
    page,
    limit,
    filters,
    setPage,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    refresh: tasklist,
  };
}

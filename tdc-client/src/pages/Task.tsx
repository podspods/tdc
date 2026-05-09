import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import { useState } from "react";
import type { ViewMode } from "../common/commun.types";
import { TASK_INIT } from "../common/constant";
import type { CreateTaskDto, Task } from "../components/task/task.types";
import Modal from "../components/task/task.Modal";
import { useTask } from "../components/task/task.useTask";
import List from "../components/task/task.List";
import Stats from "../components/task/task.Stats";

export type TaskProps = {};
export default function Task({ ...props }: TaskProps) {
  const { t } = useTranslation(["task"]);
  const {
    taskList,
    loading,
    stats,
    total,
    page,
    limit,
    setPage,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    refresh,
  } = useTask();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedTask, setSelectedTask] = useState<Task>(TASK_INIT);

  const [modalOpen, setModalOpen] = useState(false);

  //--------------------------------------------------------------------------------------------------------------------------
  async function handleSubmit(task: CreateTaskDto) {
    let success = false;
    if (viewMode === "create") {
      const result = await createTask(task);
      success = !!result;
    } else if (viewMode === "edit" && selectedTask) {
      const result = await updateTask(selectedTask.id, task);
      success = !!result;
    }
    if (success) {
      setModalOpen(false);
      setSelectedTask(TASK_INIT);
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------

  function handleCreate() {
    setSelectedTask(TASK_INIT);
    setViewMode("create");
    setModalOpen(true);
  }

  function handleEdit() {
    console.log("handleEdit", 0);
  }
  function handleDelete() {
    console.log("handleDelete", 0);
  }
  function handleView() {
    console.log("handleView", 0);
  }
  function handlePageChange() {
    console.log("handlePageChange", 0);
  }
  function handleSearch() {
    console.log("handleSearch", 0);
  }
  function handleFilterChange() {
    console.log("handleFilterChange", 0);
  }

  return (
    <>
      <MainContainer>
        <Header>
          <Title>{t("taskManagement")}</Title>

          <Button variant="primary" onClick={handleCreate}>
            {t("newTask")}
          </Button>
        </Header>

        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            setViewMode={setViewMode}
            setSelectedTask={setSelectedTask}
            onSubmit={handleSubmit}
            viewMode={viewMode}
            selectedTask={selectedTask}
            isLoading={loading}
          />
        )}

        {stats && <Stats stats={stats} />}

        <List
          taskList={taskList}
          loading={loading}
          total={total}
          page={page}
          limit={limit}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </MainContainer>
    </>
  );
}

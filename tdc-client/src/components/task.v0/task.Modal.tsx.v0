import { useTranslation } from "react-i18next";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import type { ViewMode } from "../../common/commun.types";
import type { CreateTaskDto, Task } from "./task.types";
import View from "./task.View";
import Form from "./task.Form";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setSelectedTask: (task: Task) => void;
  onSubmit: (data: CreateTaskDto) => void;
  viewMode: ViewMode;
  selectedTask: Task;
  isLoading: boolean;
};
export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["task"]);

  function handleEdit(task: Task) {
    props.setSelectedTask(task);
    props.setViewMode("edit");
    props.setModalOpen(true);
  }
  function _submit(data: CreateTaskDto) {
    props.onSubmit(data);
  }
  return (
    <>
      <ModalOverlay onClick={() => props.setModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>
              {props.viewMode === "create" && t("createTask")}
              {props.viewMode === "edit" && t("editTask")}
              {props.viewMode === "view" && t("viewTask")}
            </ModalTitle>
            <button onClick={() => props.setModalOpen(false)}>✕</button>
          </ModalHeader>
          <ModalBody>
            {props.viewMode === "view" && props.selectedTask && (
              <View
                task={props.selectedTask}
                onClose={() => props.setModalOpen(false)}
                onEdit={() => {
                  props.setModalOpen(false);
                  handleEdit(props.selectedTask);
                }}
              />
            )}
            {(props.viewMode === "create" || props.viewMode === "edit") && (
              <Form
                initialData={props.selectedTask}
                onSubmit={_submit}
                onCancel={() => props.setModalOpen(false)}
                isLoading={props.isLoading}
              />
            )}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

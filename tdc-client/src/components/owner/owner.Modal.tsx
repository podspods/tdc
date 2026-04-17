import type { ViewMode } from "../../common/commun.types";
import { ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalTitle } from "./owner.styled";
import type { CreateOwnerDto, Owner } from "./owner.types";
import { OwnersView } from "./owner.View";
import { OwnersForm } from "./owner.Form";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setSelectedOwner: (owner: Owner) => void;
  onSubmit: (data: CreateOwnerDto) => void;
  viewMode: ViewMode;
  selectedOwner: Owner;
  isLoading: boolean;
};
export default function Modal({ ...props }: ModalProps) {
  const handleEdit = (owner: Owner) => {
    props.setSelectedOwner(owner);
    props.setViewMode("edit");
    props.setModalOpen(true);
  };

  function _submit(data: CreateOwnerDto) {
    console.log("_submit", 0);
    props.onSubmit(data);
  }
  return (
    <>
      <h1>owner.Modal</h1>
      <ModalOverlay onClick={() => props.setModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>
              {props.viewMode === "create" && "Create New Owner"}
              {props.viewMode === "edit" && "Edit Owner"}
              {props.viewMode === "view" && "Owner Details"}
            </ModalTitle>
            <button onClick={() => props.setModalOpen(false)}>✕</button>
          </ModalHeader>
          <ModalBody>
            {props.viewMode === "view" && props.selectedOwner && (
              <OwnersView
                owner={props.selectedOwner}
                onClose={() => props.setModalOpen(false)}
                onEdit={() => {
                  props.setModalOpen(false);
                  handleEdit(props.selectedOwner);
                }}
              />
            )}
            {(props.viewMode === "create" || props.viewMode === "edit") && (
              <OwnersForm
                initialData={props.selectedOwner}
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

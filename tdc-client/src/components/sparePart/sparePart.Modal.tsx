import { useTranslation } from "react-i18next";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import type { ViewMode } from "../../common/commun.types";
import type { CreateSparePartDto, SparePart } from "./sparePart.types";
import View from "./sparePart.View";
import Form from "./sparePart.Form";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setSelectedSparePart: (sparePart: SparePart) => void;
  onSubmit: (data: CreateSparePartDto) => void;
  viewMode: ViewMode;
  selectedSparePart: SparePart;
  isLoading: boolean;
};
export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["sparePart"]);

  function handleEdit(sparePart: SparePart) {
    props.setSelectedSparePart(sparePart);
    props.setViewMode("edit");
    props.setModalOpen(true);
  }
  function _submit(data: CreateSparePartDto) {
    props.onSubmit(data);
  }
  console.log("setViewMode", props.setViewMode);
  console.log("selectedSparePart", props.selectedSparePart);
  return (
    <>
      <ModalOverlay onClick={() => props.setModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>
              {props.viewMode === "create" && t("createSparePart")}
              {props.viewMode === "edit" && t("editSparePart")}
              {props.viewMode === "view" && t("viewSparePart")}
            </ModalTitle>
            <button onClick={() => props.setModalOpen(false)}>✕</button>
          </ModalHeader>
          <ModalBody>
            {props.viewMode === "view" && props.selectedSparePart && (
              <View
                sparePart={props.selectedSparePart}
                onClose={() => props.setModalOpen(false)}
                onEdit={() => {
                  props.setModalOpen(false);
                  handleEdit(props.selectedSparePart);
                }}
              />
            )}
            {(props.viewMode === "create" || props.viewMode === "edit") && (
              <Form
                initialData={props.selectedSparePart}
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

import { useTranslation } from "react-i18next";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import type { ViewMode } from "../../common/commun.types";
import type { CreateVehicleDto, Vehicle } from "./vehicle.types";
import View from "./vehicle.View";
import Form from "./vehicule.Form";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setSelectedVehicle: (vehicle: Vehicle) => void;
  onSubmit: (data: CreateVehicleDto) => void;
  viewMode: ViewMode;
  selectedVehicle: Vehicle;
  isLoading: boolean;
};
export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["vehicle"]);

  function handleEdit(vehicle: Vehicle) {
    props.setSelectedVehicle(vehicle);
    props.setViewMode("edit");
    props.setModalOpen(true);
  }
  function _submit(data: CreateVehicleDto) {
    console.log("_submit", data);
    props.onSubmit(data);
  }
  return (
    <>
      <ModalOverlay onClick={() => props.setModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>
              {props.viewMode === "create" && t("createVehicle")}
              {props.viewMode === "edit" && t("editVehicle")}
              {props.viewMode === "view" && t("viewVehicle")}
            </ModalTitle>
            <button onClick={() => props.setModalOpen(false)}>✕</button>
          </ModalHeader>
          <ModalBody>
            {props.viewMode === "view" && props.selectedVehicle && (
              <View
                vehicle={props.selectedVehicle}
                onClose={() => props.setModalOpen(false)}
                onEdit={() => {
                  props.setModalOpen(false);
                  handleEdit(props.selectedVehicle);
                }}
              />
            )}
            {(props.viewMode === "create" || props.viewMode === "edit") && (
              <Form
                initialData={props.selectedVehicle}
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

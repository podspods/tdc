import { type InvoiceDisplay } from "./types";
import { _getInvoiceById } from "./service";
import {
  invoiceDisplayInit,
  invoiceInit,
  modalIsOpenInit,
  vehicleInfoInit,
} from "../../common/constant";
import type { Owner } from "../owner/types";
import ActionBar from "./ActionBar";
import { Modal as ModalCreateInvoiceLine } from "../partAndLabor/Modal";

import { Modal as ModalOwner } from "../owner/Modal";
import { Modal as ModalVehicle } from "../vehicle/Modal";
import DisplayInvoice from "./DisplayInvoice";
import { useEffect, useState } from "react";
import type { Vehicle, VehicleInfo } from "../vehicle/types";
import { ComponentStatus, type ModalIsOpen } from "../../common/commun.types";
import { fetchInvoiceDisplay } from "./helper";

export type ViewProps = {
  onStateChange: (state: ComponentStatus, invoiceId: number) => void;
  invoiceId: number;
  invoiceState: ComponentStatus;
};
export default function View({ ...props }: ViewProps) {
  const [invoiceDisplay, setInvoiceDisplay] = useState<InvoiceDisplay>(invoiceDisplayInit);
  const [isModalOpen, setModalOpen] = useState<ModalIsOpen>(modalIsOpenInit);
  const [ownerChange, setOwnerChange] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    const loadData = async (id: number) => {
      try {
        const newInvoiceDisplay = await fetchInvoiceDisplay(id);
        console.log("fetchInvoiceDisplay 30", id);
        console.log("newInvoiceDisplay 31", newInvoiceDisplay);
        setInvoiceDisplay(newInvoiceDisplay);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    if (props.invoiceId !== invoiceInit.id) loadData(props.invoiceId);
  }, [props.invoiceId, refresh]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus) => {
    props.onStateChange(state, invoiceDisplay.invoice.id);
  };
  // //--------------------------------------------------------------------------------------------------------------------------

  const handleNewOwner = () => {
    setModalOpen((prev) => ({ ...prev, owner: true }));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleModalOwnerOpen = (isOpen: boolean) => {
    setModalOpen((prev) => ({ ...prev, owner: isOpen }));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  const handleModalVehicleOpen = (isOpen: boolean) => {
    setModalOpen((prev) => ({ ...prev, vehicule: isOpen }));
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleNewVehicle = () => {
    const newModalIsOpenInit: ModalIsOpen = { ...modalIsOpenInit, vehicule: true };
    setModalOpen(newModalIsOpenInit);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleNewInvoiceLine = () => {
    const newModalIsOpenInit: ModalIsOpen = { ...modalIsOpenInit, invoiceLine: true };
    setModalOpen(newModalIsOpenInit);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSetOwner = (newOwner: Owner) => {
    setOwnerChange(invoiceDisplay.vehicleInfo.owner.id !== newOwner.id);
    if (invoiceDisplay.vehicleInfo.owner.id !== newOwner.id) {
      const newVehicleInfo: VehicleInfo = { ...vehicleInfoInit, owner: newOwner };
      const newInvoiceDisplay: InvoiceDisplay = { ...invoiceDisplay, vehicleInfo: newVehicleInfo };
      setInvoiceDisplay(newInvoiceDisplay);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSetVehicle = (newVehicle: Vehicle) => {
    if (invoiceDisplay.vehicleInfo.vehicle.id !== newVehicle.id) {
      const newVehicleInfo: VehicleInfo = { ...invoiceDisplay.vehicleInfo, vehicle: newVehicle };
      const newInvoiceDisplay: InvoiceDisplay = { ...invoiceDisplay, vehicleInfo: newVehicleInfo };

      setInvoiceDisplay(newInvoiceDisplay);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleModalClose = () => {
    setModalOpen(modalIsOpenInit);
    setRefresh((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnRefresh = () => {
    setRefresh((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <ActionBar onAction={handleAction} withPdf />

      <DisplayInvoice
        onStateChange={props.onStateChange}
        invoiceDisplay={invoiceDisplay}
        invoiceState={props.invoiceState}
        ownerChange={ownerChange}
        onNewOwner={handleNewOwner}
        setOwner={handleSetOwner}
        onNewInvoiceLine={handleNewInvoiceLine}
        onRefresh={handleOnRefresh}
      />

      {props.invoiceState === ComponentStatus.Edit && (
        <>
          <ModalOwner
            value={invoiceDisplay.vehicleInfo.owner}
            componentStatus={props.invoiceState}
            isModalOpen={isModalOpen.owner}
            setModalOpen={handleModalOwnerOpen}
            onClose={handleModalClose}
          />
          <ModalVehicle
            value={invoiceDisplay.vehicleInfo}
            componentStatus={props.invoiceState}
            isModalOpen={isModalOpen.vehicule}
            setModalOpen={handleModalVehicleOpen}
            onClose={handleModalClose}
            onNewOwner={handleNewOwner}
          />
          <ModalCreateInvoiceLine
            isOpen={isModalOpen.invoiceLine}
            onNewInvoiceLine={handleNewInvoiceLine}
            invoiceId={invoiceDisplay.invoice.id}
            typeLineId={0}
            onClose={handleModalClose}
            onSuccess={handleModalClose}
          />
        </>
      )}
    </>
  );
}

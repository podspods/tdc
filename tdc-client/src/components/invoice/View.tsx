import { InvoiceState, type InvoiceDisplay } from "./types";
import { _getInvoiceById } from "./service";
import { invoiceDisplayInit, modalIsOpenInit, vehicleInfoInit } from "../../common/constant";
import type { Owner } from "../owner/types";
import ActionBar from "./ActionBar";
import { Modal as ModalCreateInvoiceLine } from "../partAndLabor/Modal";

import { Modal as ModalOwner } from "../owner/Modal";
import { Modal as ModalVehicle } from "../vehicle/Modal";
import DisplayInvoice from "./DisplayInvoice";
import { useEffect, useState } from "react";
import type { Vehicle, VehicleInfo } from "../vehicle/types";
import type { ModalIsOpen } from "../../common/commun.types";
import { fetchInvoiceDisplay } from "./helper";

export type ViewProps = {
  onStateChange: (state: InvoiceState, invoiceId: number) => void;
  invoiceId: number;
  invoiceState: InvoiceState;
};
export default function View({ ...props }: ViewProps) {
  const [invoiceDisplay, setInvoiceDisplay] = useState<InvoiceDisplay>(invoiceDisplayInit);
  const [isModalOpen, setModalOpen] = useState<ModalIsOpen>(modalIsOpenInit);
  const [ownerChange, setOwnerChange] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async (id: number) => {
      try {
        const newInvoiceDisplay = await fetchInvoiceDisplay(id);
        setInvoiceDisplay(newInvoiceDisplay);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    loadData(props.invoiceId);
  }, [props.invoiceId]);

  //--------------------------------------------------------------------------------------------------------------------------

  const handleAction = (state: InvoiceState) => {
    props.onStateChange(state, invoiceDisplay.invoice.id);
  };

  // //--------------------------------------------------------------------------------------------------------------------------

  const handleNewOwner = () => {
    const newModalIsOpenInit: ModalIsOpen = { ...modalIsOpenInit, owner: true };
    setModalOpen(newModalIsOpenInit);
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
  const HandleSetOwner = (newOwner: Owner) => {
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
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      {props.invoiceState === InvoiceState.ToPdf && null}

      {props.invoiceState !== InvoiceState.ToPdf && (
        <>
          <ActionBar onAction={handleAction} />

          <DisplayInvoice
            onStateChange={props.onStateChange}
            invoiceDisplay={invoiceDisplay}
            invoiceState={props.invoiceState}
            ownerChange={ownerChange}
            onNewOwner={handleNewOwner}
            setOwner={HandleSetOwner}
          />
          <ModalOwner
            isOpen={isModalOpen.owner}
            owner={invoiceDisplay.vehicleInfo.owner}
            onNewVehicle={handleNewOwner}
            onClose={handleModalClose}
            onSuccess={handleModalClose}
            setOwner={HandleSetOwner}
          />
          <ModalVehicle
            isOpen={isModalOpen.vehicule}
            vehicle={invoiceDisplay.vehicleInfo.vehicle}
            owner={invoiceDisplay.vehicleInfo.owner}
            onNewOwner={handleNewOwner}
            onClose={handleModalClose}
            onSuccess={handleModalClose}
            setVehicle={handleSetVehicle}
            onNewVehicle={handleNewVehicle}
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

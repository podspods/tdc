import { InvoiceState, type InvoiceInfo } from "./types";
import { _getInvoiceById } from "./invoice.service";
import { invoiceInfoInit, ownerInit, vehicleInit } from "../../common/constant";
import type { Owner } from "../owner/types";
import ActionBar from "./ActionBar";
import { Modal as ModalCreateInvoiceLine } from "../partAndLabor/Modal";

import { Modal as ModalOwner } from "../owner/Modal";
import { Modal as ModalVehicle } from "../vehicle/Modal";
import DisplayInvoice from "./DisplayInvoice";
import { useEffect, useState } from "react";
import type { Vehicle } from "../vehicle/types";
import { getOwnerById } from "../owner/crud";
import toast from "react-hot-toast";
import { pdf } from "@react-pdf/renderer";

export type ModalIsOpen = {
  owner: boolean;
  vehicule: boolean;
  invoiceLine: boolean;
};

export const modalIsOpenInit: ModalIsOpen = {
  owner: false,
  vehicule: false,
  invoiceLine: false,
};

export type ViewProps = {
  onStateChange: (state: InvoiceState, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
  invoiceState: InvoiceState;
};
export default function View({ ...props }: ViewProps) {
  const [owner, setOwner] = useState<Owner>(ownerInit);
  const [isModalOpen, setModalOpen] = useState<ModalIsOpen>(modalIsOpenInit);
  const [ownerChange, setOwnerChange] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<Vehicle>(vehicleInit);

  useEffect(() => {
    fetchOwner(props.invoiceInfo.ownerId);
  }, [props.invoiceInfo]);

  useEffect(() => {
    if (props.invoiceState === InvoiceState.ToPdf) {
      generatePdf();
    }
  }, [props.invoiceState]);

  const generatePdf = async () => {
    const blob = await pdf(
      <DisplayInvoice
        invoiceInfo={props.invoiceInfo}
        invoiceState={props.invoiceState}
        owner={owner}
      />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    props.onStateChange(InvoiceState.View, props.invoiceInfo.id);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchOwner = async (ownerId: number) => {
    if (ownerId !== invoiceInfoInit.ownerId) {
      try {
        const response = await getOwnerById(ownerId); // appel avec l'ID 3
        setOwner(response);
      } catch (err) {
        toast.error("Une erreur inattendue est survenue");
      }
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleAction = (state: InvoiceState) => {
    props.onStateChange(state, props.invoiceInfo.id);
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
    setOwnerChange(owner.id !== newOwner.id);
    setOwner(newOwner);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSetVehicle = (newVehicle: Vehicle) => {
    setVehicle(newVehicle);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleModalClose = () => {
    setModalOpen(modalIsOpenInit);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <p>
        [{props.invoiceState}] [{InvoiceState.ToPdf}]
      </p>
      {props.invoiceState === InvoiceState.ToPdf && null}

      {props.invoiceState !== InvoiceState.ToPdf && (
        <>
          <p>[action barre]</p>
          <ActionBar onAction={handleAction} />

          <DisplayInvoice
            onStateChange={props.onStateChange}
            invoiceInfo={props.invoiceInfo}
            invoiceState={props.invoiceState}
            ownerChange={ownerChange}
            owner={owner}
            onNewOwner={handleNewOwner}
          />
          <ModalOwner
            isOpen={isModalOpen.owner}
            owner={owner}
            onNewVehicle={handleNewOwner}
            onClose={handleModalClose}
            onSuccess={handleModalClose}
            setOwner={HandleSetOwner}
          />
          <ModalVehicle
            isOpen={isModalOpen.vehicule}
            vehicle={vehicle}
            owner={owner}
            onNewOwner={handleNewOwner}
            onClose={handleModalClose}
            onSuccess={handleModalClose}
            setVehicle={handleSetVehicle}
            onNewVehicle={handleNewVehicle}
          />
          <ModalCreateInvoiceLine
            isOpen={isModalOpen.invoiceLine}
            onNewInvoiceLine={handleNewInvoiceLine}
            invoiceId={props.invoiceInfo.id}
            typeLineId={0}
            onClose={handleModalClose}
            onSuccess={handleModalClose}
          />
        </>
      )}
    </>
  );
}

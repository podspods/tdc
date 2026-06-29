import { MainContainer } from "../../common/common.styled";
import { LeftSide, RightSide, TwoHalfPage } from "./view.style";
import { default as GarageSection } from "../garage/Display";
import { default as VehicleSection } from "../vehicle/Badge";
import { default as OwnerSection } from "../owner/Badge";
import LineSection from "./LineSection";
import Agreement from "./Agreement";

import DaySection from "./DaySection";
import { Input } from "../UI/Input";
import { type Invoice, type InvoiceDisplay } from "./types";
import { useEffect, useState } from "react";
import { invoiceInit, statusCodeDraft } from "../../common/constant";
import type { Owner } from "../owner/types";
import { useTranslation } from "react-i18next";
import { generateInvoiceNumber } from "../../common/common";
import { createInvoice, updateInvoice } from "./crud";
import styled from "styled-components";
import { ComponentStatus } from "../../common/commun.types";

export type DisplayInvoiceProps = {
  invoiceDisplay: InvoiceDisplay;
  onStateChange?: (state: ComponentStatus, invoiceId: number) => void;
  invoiceState: ComponentStatus;
  ownerChange?: boolean;
  onNewOwner?: () => void;
  setOwner?: (owner: Owner) => void;
  onNewVehicle?: () => void;
  onNewInvoiceLine?: () => void;
  onRefresh: () => void;
};
export default function DisplayInvoice({ ...props }: DisplayInvoiceProps) {
  const { t } = useTranslation(["invoice"]);

  const [invoiceDisplay, setInvoiceDisplay] = useState<InvoiceDisplay>(props.invoiceDisplay);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setInvoiceDisplay(props.invoiceDisplay);
  }, [props.invoiceDisplay]);

  useEffect(() => {
    setEditMode(
      props.invoiceState === ComponentStatus.Edit || props.invoiceState === ComponentStatus.Create,
    );
  }, [props.invoiceState]);
  //--------------------------------------------------------------------------------------------------------------------------
  const handleGarageChange = async (garageId: number) => {
    const newInvoiceNewGarage: Invoice = { ...invoiceDisplay.invoice, garageId: garageId };
    const invoiceNumber = generateInvoiceNumber(newInvoiceNewGarage);

    const newInvoice: Invoice = { ...newInvoiceNewGarage, invoiceNumber: invoiceNumber };

    const invoiceResult = await updateOrCreate(newInvoice);
    const newInvoiceDisplay: InvoiceDisplay = { ...invoiceDisplay, invoice: invoiceResult };
    setInvoiceDisplay(newInvoiceDisplay);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOwnerChange = async (ownerId: number) => {
    // ???????????????????????????????????????????????,

    const newInvoiceNewGarage: Invoice = { ...invoiceDisplay.invoice, : ownerId };
    const invoiceNumber = generateInvoiceNumber(newInvoiceNewGarage);

    const newInvoice: Invoice = { ...newInvoiceNewGarage, invoiceNumber: invoiceNumber };

    const invoiceResult = await updateOrCreate(newInvoice);
    const newInvoiceDisplay: InvoiceDisplay = { ...invoiceDisplay, invoice: invoiceResult };
    setInvoiceDisplay(newInvoiceDisplay);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleIssueDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIssueDate: Date = new Date(e.target.value);
    const newInvoice: Invoice = { ...invoiceDisplay.invoice, issueDate: newIssueDate };

    const invoiceResult = await updateOrCreate(newInvoice);

    const newInvoiceDisplay: InvoiceDisplay = { ...invoiceDisplay, invoice: invoiceResult };
    setInvoiceDisplay(newInvoiceDisplay);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleDueDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate: Date = new Date(e.target.value);
    const newInvoiceDueDat: Invoice = { ...invoiceDisplay.invoice, dueDate: newDueDate };
    const invoiceNumber = generateInvoiceNumber(newInvoiceDueDat);
    const newInvoice: Invoice = { ...newInvoiceDueDat, invoiceNumber: invoiceNumber };

    const invoiceResult = await updateOrCreate(newInvoice);
    const newInvoiceDisplay: InvoiceDisplay = { ...invoiceDisplay, invoice: invoiceResult };
    setInvoiceDisplay(newInvoiceDisplay);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleVehicleChange = async (vehicleId: number) => {
    const newInvoiceNewVehicle: Invoice = { ...invoiceDisplay.invoice, vehicleId: vehicleId };

    const invoiceNumber = generateInvoiceNumber(newInvoiceNewVehicle);

    const newInvoice: Invoice = { ...newInvoiceNewVehicle, invoiceNumber: invoiceNumber };

    const invoiceResult = await updateOrCreate(newInvoice);

    const newInvoiceDisplay: InvoiceDisplay = { ...invoiceDisplay, invoice: invoiceResult };
    setInvoiceDisplay(newInvoiceDisplay);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const updateOrCreate = async (invoice: Invoice): Promise<Invoice> => {
    if (invoice.garageId != invoiceInit.garageId && invoice.vehicleId !== invoiceInit.vehicleId) {
      const result =
        invoice.id !== invoiceInit.id
          ? await updateInvoice(invoice)
          : await createInvoice({
              ...invoice,
              statusCode: statusCodeDraft,
              issueDate:
                invoice.issueDate !== invoiceInit.issueDate
                  ? invoice.issueDate
                  : invoiceDisplay.invoice.issueDate,
              dueDate:
                invoice.dueDate !== invoiceInit.dueDate
                  ? invoice.issueDate
                  : invoiceDisplay.invoice.dueDate,
            });
      return result;
    }
    return invoice;
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <MainContainer>
        <InvoiceHeader>
          <LeftSide>
            <GarageSection
              value={invoiceDisplay.garage}
              editMode={editMode}
              onChange={handleGarageChange}
            />
          </LeftSide>
          <RightSide>
            <OwnerSection
              value={invoiceDisplay.vehicleInfo.owner}
              editMode={editMode}
              setOwner={props?.setOwner}
              onNewVehicle={props.onNewVehicle}
              onChange={handleOwnerChange}
            />
            <VehicleSection
              value={invoiceDisplay.vehicleInfo.vehicle}
              ownerChange={props.ownerChange}
              owner={invoiceDisplay.vehicleInfo.owner}
              editMode={editMode}
              onChange={handleVehicleChange}
              onNewOwner={props.onNewOwner}
              onNewVehicle={props.onNewVehicle}
            />
            <DaySection
              issueDate={invoiceDisplay.invoice.issueDate}
              dueDate={invoiceDisplay.invoice.dueDate}
              handleDueDateChange={handleDueDateChange}
              handleIssueDateChange={handleIssueDateChange}
              editMode={editMode}
            />
            <Input
              label={t("invoiceNumber")}
              value={invoiceDisplay.invoice.invoiceNumber}
              readOnly
            />
          </RightSide>
        </InvoiceHeader>
        <InvoiceLineDiv>
          <LineSection
            onNewInvoiceLine={props.onNewInvoiceLine}
            editMode={editMode}
            invoiceDisplay={invoiceDisplay}
            setIsModalOpen={props.onNewInvoiceLine}
            onRefresh={props.onRefresh}
          />
        </InvoiceLineDiv>
        <Agreement />
      </MainContainer>
    </>
  );
}

const InvoiceHeader = styled(TwoHalfPage)``;
const InvoiceLineDiv = styled.div``;

import { MainContainer } from "../../common/common.styled";
import { LeftSide, RightSide, TwoHalfPage } from "./view.style";
import { default as GarageSection } from "../garage/Display";
import { default as VehicleSection } from "../vehicle/Badge";
import { default as OwnerSection } from "../owner/Badge";
import LineSection from "./LineSection";
import Agreement from "./Agreement";

import DaySection from "./DaySection";
import { Input } from "../UI/Input";
import { InvoiceState, type Invoice, type InvoiceInfo, type InvoiceLine } from "./types";
import { useEffect, useState } from "react";
import {
  correspondanceInit,
  garageInit,
  invoiceInfoInit,
  invoiceInit,
  lineTypeSubjectCode,
  statusCodeDraft,
  todayDate,
  vehicleInfoInit,
  vehicleInit,
} from "../../common/constant";
import type { Owner } from "../owner/types";
import type { VehicleInfo } from "../vehicle/types";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { generateInvoiceNumber } from "../../common/common";
import { createInvoice, getInvoiceById, getInvoiceLineById, updateInvoice } from "./crud";
import { getVehicleInfoById } from "../vehicle/Crud";
import styled from "styled-components";
import type { Garage } from "../garage/garage.types";
import type { Correspondance } from "../correspondance/types";
import { getCorrespondanceBySubject } from "../correspondance/crud";

export type DisplayInvoiceProps = {
  onStateChange?: (state: InvoiceState, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
  invoiceState: InvoiceState;
  ownerChange?: boolean;
  owner: Owner;
  onNewOwner?: () => void;
  setOwner?: (owner: Owner) => void;
  onNewVehicle?: () => void;
  onNewInvoiceLine?: () => void;
};
export default function DisplayInvoice({ ...props }: DisplayInvoiceProps) {
  const { t } = useTranslation(["invoice"]);

  const [typeLineList, seTypeLineList] = useState<Correspondance[]>([]);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(vehicleInfoInit);
  const [garage, setGarage] = useState<Garage>(garageInit);
  const [invoice, setInvoice] = useState<Invoice>(invoiceInit);
  const [invoiceLineList, setInvoiceLineList] = useState<InvoiceLine[]>([]);

  const [issueDate, setIssueDate] = useState<Date>(props.invoiceInfo.issueDate);
  const [dueDate, setDueDate] = useState<Date>(props.invoiceInfo.dueDate);

  useEffect(() => {
    fetchInvoice(props.invoiceInfo.id);
    fetchVehicle(props.invoiceInfo.vehicleId);
    initInvoiceDate(props.invoiceInfo);
    fetchTypeLine();
    fetchInvoiceLineList(props.invoiceInfo.id);
  }, [props.invoiceInfo]);

  //--------------------------------------------------------------------------------------------------------------------------
  const fetchInvoiceLineList = async (invoiceId: number) => {
    try {
      console.log("invoiceId 81", invoiceId);
      const newInvoiceLineList = await getInvoiceLineById(invoiceId);
      console.log("newInvoiceLineList 81", newInvoiceLineList);

      setInvoiceLineList(newInvoiceLineList);
    } catch (error) {
      toast.error("Une erreur inattendue est survenue");
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchTypeLine = async () => {
    const newTypeLine = await getCorrespondanceBySubject(lineTypeSubjectCode);
    seTypeLineList(newTypeLine);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const initInvoiceDate = (invoiceInfo: InvoiceInfo) => {
    const newIssueDate =
      invoiceInfo.issueDate !== invoiceInfoInit.issueDate ? invoiceInfo.issueDate : todayDate;

    const newDueDate =
      invoiceInfo.dueDate !== invoiceInfoInit.dueDate ? invoiceInfo.dueDate : todayDate;

    setIssueDate(newIssueDate);
    setDueDate(newDueDate);
    const newInvoice = { ...invoice, issueDate: newIssueDate, dueDate: newDueDate };
    // const newInvoice2 = { ...newInvoice, invoiceNumber: generateInvoiceNumber(newInvoice) };
    setInvoice({ ...newInvoice, invoiceNumber: generateInvoiceNumber(newInvoice) });
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const fetchInvoice = async (id: number) => {
    if (id !== invoiceInfoInit.id) {
      try {
        const response = await getInvoiceById(id); // appel avec l'ID 3
        setInvoice(response);
      } catch (err) {
        toast.error("Une erreur inattendue est survenue");
      }
    } else {
      const newInvoiceDate: Invoice = {
        ...invoiceInit,
        issueDate: todayDate,
        dueDate: todayDate,
      };

      const invoiceNumber = generateInvoiceNumber(newInvoiceDate);
      const newInvoice: Invoice = {
        ...newInvoiceDate,
        invoiceNumber: invoiceNumber,
      };
      setInvoice(newInvoice);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const fetchVehicle = async (id: number) => {
    if (id !== vehicleInit.id) {
      try {
        const response = await getVehicleInfoById(id); // appel avec l'ID 3
        setVehicleInfo(response);
      } catch (err) {
        toast.error("Une erreur inattendue est survenue");
      }
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleGarageChange = async (garageId: number) => {
    const newInvoiceNewGarage: Invoice = { ...invoice, garageId: garageId };
    const invoiceNumber = generateInvoiceNumber(newInvoiceNewGarage);

    const newInvoice: Invoice = { ...newInvoiceNewGarage, invoiceNumber: invoiceNumber };

    const invoiceResult = await updateOrCreate(newInvoice);
    setInvoice(invoiceResult);
  };

  //--------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------

  const handleIssueDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIssueDate: Date = new Date(e.target.value);
    setIssueDate(newIssueDate);
    const newInvoice: Invoice = { ...invoice, issueDate: newIssueDate };

    const invoiceResult = await updateOrCreate(newInvoice);
    setInvoice(invoiceResult);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  const handleVehicleChange = async (vehicleId: number) => {
    const newInvoiceNewVehicle: Invoice = { ...invoice, vehicleId: vehicleId };

    const invoiceNumber = generateInvoiceNumber(newInvoiceNewVehicle);

    const newInvoice: Invoice = { ...newInvoiceNewVehicle, invoiceNumber: invoiceNumber };

    const invoiceResult = await updateOrCreate(newInvoice);
    setInvoice(invoiceResult);
  };
  const handleDueDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate: Date = new Date(e.target.value);
    setIssueDate(newDueDate);
    const newInvoiceDueDat: Invoice = { ...invoice, dueDate: newDueDate };

    const invoiceNumber = generateInvoiceNumber(newInvoiceDueDat);

    const newInvoice: Invoice = { ...newInvoiceDueDat, invoiceNumber: invoiceNumber };

    const invoiceResult = await updateOrCreate(newInvoice);
    setInvoice(invoiceResult);
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
                invoice.issueDate !== invoiceInit.issueDate ? invoice.issueDate : issueDate,
              dueDate: invoice.dueDate !== invoiceInit.dueDate ? invoice.issueDate : dueDate,
            });
      return result;
    }
    return invoice;
  };
  return (
    <>
      <MainContainer>
        <InvoiceHeader>
          <LeftSide>
            <GarageSection
              value={garage}
              editMode={props.invoiceState === InvoiceState.Edit}
              onChange={handleGarageChange}
            />
          </LeftSide>
          <RightSide>
            <OwnerSection
              value={props.owner}
              editMode={props.invoiceState === InvoiceState.Edit}
              setOwner={props?.setOwner}
              onNewVehicle={props.onNewVehicle}
            />
            <VehicleSection
              value={vehicleInfo}
              ownerChange={props.ownerChange}
              owner={props.owner}
              editMode={props.invoiceState === InvoiceState.Edit}
              onChange={handleVehicleChange}
              onNewOwner={props.onNewOwner}
              onNewVehicle={props.onNewVehicle}
            />
            <DaySection
              issueDate={issueDate}
              dueDate={dueDate}
              handleDueDateChange={handleDueDateChange}
              handleIssueDateChange={handleIssueDateChange}
              editMode={props.invoiceState === InvoiceState.Edit}
            />
            <Input label={t("invoiceNumber")} value={invoice.invoiceNumber} readOnly />
          </RightSide>
        </InvoiceHeader>
        <InvoiceLineDiv>
          <LineSection
            typeLineList={typeLineList}
            onNewInvoiceLine={props.onNewInvoiceLine}
            value={invoiceLineList}
            editMode={props.invoiceState === InvoiceState.Edit}
          />
        </InvoiceLineDiv>
        <Agreement />
      </MainContainer>
    </>
  );
}

const InvoiceHeader = styled(TwoHalfPage)``;
const InvoiceLineDiv = styled.div``;

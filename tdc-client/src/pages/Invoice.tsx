import { MainContainer } from "../common/common.styled";
import {
  _getAllInvoices,
  _getInvoiceById,
  _getInvoiceLine,
  _getInvoicesInfoList,
} from "../components/invoice/service";
import { useState } from "react";
import { _getOwnerById } from "../components/owner/service";
import { _getVehicleById } from "../components/vehicle/vehicle.service";
import { invoiceInit, ownerInit } from "../common/constant";
import { _getGarageById } from "../components/garage/garage.service";
import List from "../components/invoice/List";
import View from "../components/invoice/View";
import { InvoiceState, type Invoice, type InvoiceInfo } from "../components/invoice/types";
import type { Owner } from "../components/owner/types";
import { getOwnerById } from "../components/owner/crud";
import ToPdf from "../components/pdf/ToPdf";

export default function Invoice() {
  const [invoiceState, setInvoiceState] = useState<InvoiceState>(InvoiceState.InitState);
  const [invoice, setInvoice] = useState<Invoice>(invoiceInit);
  const [owner, setOwner] = useState<Owner>(ownerInit);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleSelect = async (invoiceInfo: InvoiceInfo) => {
    const newInvoice: Invoice = {
      id: invoiceInfo.id,
      invoiceNumber: invoiceInfo.invoiceNumber,
      createdAt: invoiceInfo.createdAt,
      updatedAt: invoiceInfo.updatedAt,
      createdBy: invoiceInfo.createdBy,
      garageId: invoiceInfo.garageId,
      vehicleId: invoiceInfo.vehicleId,
      issueDate: invoiceInfo.issueDate,
      dueDate: invoiceInfo.dueDate,
      statusCode: invoiceInfo.statusCode,
      notes: invoiceInfo.notes,
    };
    setInvoice(newInvoice);
    if (owner.id !== invoiceInfo.ownerId) {
      const newOwner: Owner = await getOwnerById(invoiceInfo.ownerId);

      setOwner(newOwner);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      {invoiceState === InvoiceState.InitState && (
        <List onStateChange={setInvoiceState} onSelected={handleSelect} />
      )}
      {invoiceState === InvoiceState.Edit && (
        <View onStateChange={setInvoiceState} invoiceId={invoice.id} invoiceState={invoiceState} />
      )}
      {invoiceState === InvoiceState.View && (
        <View onStateChange={setInvoiceState} invoiceId={invoice.id} invoiceState={invoiceState} />
      )}
      {invoiceState === InvoiceState.ToPdf && (
        <ToPdf onStateChange={setInvoiceState} invoiceId={invoice.id} invoiceState={invoiceState} />
      )}
    </MainContainer>
  );
}

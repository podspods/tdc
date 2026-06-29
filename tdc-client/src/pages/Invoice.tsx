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
import { type Invoice, type InvoiceInfo } from "../components/invoice/types";
import type { Owner } from "../components/owner/types";
import { getOwnerById } from "../components/owner/crud";
import ToPdf from "../components/pdf/ToPdf";
import { ComponentStatus } from "../common/commun.types";

export default function Invoice() {
  const [invoiceState, setInvoiceState] = useState<ComponentStatus>(ComponentStatus.Init);
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
  const handleOnStateChange = (state: ComponentStatus) => {
    setInvoiceState(state);
    if (state === ComponentStatus.Create) {
      setInvoice(invoiceInit);
      setOwner(ownerInit);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      {invoiceState === ComponentStatus.Init && (
        <List onStateChange={handleOnStateChange} onSelected={handleSelect} />
      )}
      {(invoiceState === ComponentStatus.View ||
        invoiceState === ComponentStatus.Edit ||
        invoiceState === ComponentStatus.Create) && (
        <View
          onStateChange={handleOnStateChange}
          invoiceId={invoice.id}
          invoiceState={invoiceState}
        />
      )}

      {invoiceState === ComponentStatus.ToPdf && (
        <ToPdf
          onStateChange={handleOnStateChange}
          invoiceId={invoice.id}
          invoiceState={invoiceState}
        />
      )}
    </MainContainer>
  );
}

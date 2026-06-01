import { MainContainer } from "../common/common.styled";
import {
  _getAllInvoices,
  _getInvoiceById,
  _getInvoiceLine,
  _getInvoicesInfoList,
} from "../components/Invoice/invoice.service";
import { useState } from "react";
import { type Invoice, type InvoiceInfo, InvoiceState } from "../components/Invoice/invoice.types";
import { _getOwnerById } from "../components/owner/service";
import { _getVehicleById } from "../components/vehicle/vehicle.service";
import { invoiceInfoInit } from "../common/constant";
import { _getGarageById } from "../components/Garage/garage.service";
import List from "../components/Invoice/List";
import Edit from "../components/Invoice/Edit";
import Create from "../components/Invoice/Create";
import View from "../components/Invoice/View";
import InvoiceToPdf from "../components/Invoice/InvoiceToPdf";

export default function Invoice() {
  const [invoiceState, setInvoiceState] = useState<InvoiceState>(InvoiceState.InitState);
  const [currentInvoiceInfo, setCurrentInvoiceInfo] = useState<InvoiceInfo>(invoiceInfoInit);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleSelect = (invoiceInfo: InvoiceInfo) => {
    setCurrentInvoiceInfo(invoiceInfo);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <MainContainer>
      {invoiceState === InvoiceState.InitState && (
        <List onStateChange={setInvoiceState} onSelected={handleSelect} />
      )}
      {invoiceState === InvoiceState.View && (
        <View onStateChange={setInvoiceState} invoiceInfo={currentInvoiceInfo} />
      )}
      {invoiceState === InvoiceState.Edit && (
        <Edit onStateChange={setInvoiceState} invoiceInfo={currentInvoiceInfo} />
      )}
      {invoiceState === InvoiceState.Create && (
        <Create onStateChange={setInvoiceState} invoiceInfo={currentInvoiceInfo} />
      )}
      {invoiceState === InvoiceState.ToPdf && (
        <InvoiceToPdf invoiceInfo={currentInvoiceInfo} onStateChange={setInvoiceState} />
      )}
    </MainContainer>
  );
}

import { useTranslation } from "react-i18next";
import { Button, Header, MainContainer, Title } from "../common/common.styled";
import { pdf } from "@react-pdf/renderer";
import ToPdf from "../components/Invoice/invoice.ToPdf";
import { dateTest, garageTest, invoiceNulberText } from "../components/Invoice/Pdf.test";
import type { PdfDataHeader } from "../components/Invoice/Pdf.types";
import {
  _getAllInvoices,
  _getInvoiceById,
  _getInvoiceLine,
  _getInvoicesInfoList,
} from "../components/Invoice/invoice.service";
import PageContent from "../components/Invoice/PageContent";
import { useEffect, useState } from "react";
import type { Invoice, InvoiceInfo } from "../components/Invoice/invoice.types";
import { _getOwnerById } from "../components/owner/owner.service";
import { _getVehicleById } from "../components/vehicle/vehicle.service";
import type { Vehicle } from "../components/vehicle/vehicle.types";
import { INVOICE_INIT, OWNER_INIT, VEHICLE_INIT } from "../common/constant";
import type { Owner } from "../components/owner/owner.types";
import { InvoiceForm } from "../components/Invoice/invoice.Form";

export default function Invoice() {
  const { t } = useTranslation(["invoice"]);

  const [invoiceInfoList, setInvoiceInfoList] = useState<InvoiceInfo[]>([]);
  const [invoiceEdit, setInvoiceEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatingId, setGeneratingId] = useState<number>(0);
  const [dummyNumber, setDummyNumber] = useState<number>(42);

  // const header: PdfDataHeader = headerTest;
  // const taskList: InvoiceItem[] = taskListsTest;
  // const sparePartList: InvoiceItem[] = sparePartListTest;
  // const consumableList: InvoiceItem[] = consumablelistTest;
  //--------------------------------------------------------------------------------------------------------------------------

  // Load all invoices on mount
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await _getInvoicesInfoList();
        if (response.success && response.data) {
          setInvoiceInfoList(response.data);
        } else {
          console.error("Failed to load invoices:", response.error);
        }
      } catch (err) {
        console.error("catch Error loading invoices", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [dummyNumber]);

  //--------------------------------------------------------------------------------------------------------------------------

  async function handleGeneratePdf(invoiceId: number) {
    setGeneratingId(invoiceId);
    // Generate the PDF document
    const invoiceRes = await _getInvoiceById(invoiceId);

    if (!invoiceRes.success) {
      console.error("invoice not found  id:", invoiceId);
      return;
    }
    const currentInvoice: Invoice = invoiceRes.data || INVOICE_INIT;
    const vehicleResponse = await _getVehicleById(currentInvoice?.vehicleId || 0);

    if (!vehicleResponse.success) {
      console.error("vehicle not found id :", currentInvoice.vehicleId);
      return;
    }
    const vehicle: Vehicle = vehicleResponse?.data || VEHICLE_INIT;
    const ownerResponse = await _getOwnerById(vehicle.ownerId);
    console.log("ownerResponse", ownerResponse);
    if (!ownerResponse.data) {
      console.error("owner not found id :", vehicle.ownerId);
      return;
    }

    const owner: Owner = ownerResponse?.data || OWNER_INIT;

    // 2. Get invoice lines
    const linesRes = await _getInvoiceLine(invoiceId);
    const lines = linesRes.success ? linesRes.data : [];

    // 3. Filter lines by type
    const taskList = lines?.filter((l) => l.lineTypeCode === 1);
    const sparePartList = lines?.filter((l) => l.lineTypeCode === 2);
    const consumableList = lines?.filter((l) => l.lineTypeCode === 3);

    console.log("taskList", taskList);

    // 3. Construire l’en‑tête (avec les vraies données)
    const invoiceHeader: PdfDataHeader = {
      garage: garageTest,
      owner: owner,
      vehicle: vehicle,
      invoiceNumber: currentInvoice?.invoiceNumber || invoiceNulberText,
      invoiceDate: dateTest,
    };

    const blob = await pdf(
      <ToPdf
        header={invoiceHeader}
        taskList={taskList || []}
        sparePartList={sparePartList || []}
        consumableList={consumableList || []}
      />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    // Open in a new tab
    window.open(url, "_blank");
    // Revoke the URL after a delay to free memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  //--------------------------------------------------------------------------------------------------------------------------
  // Optional: keep the existing button for a default invoice (ID 4)
  async function handleCreateDefault() {
    await handleGeneratePdf(4);
  }
  //--------------------------------------------------------------------------------------------------------------------------

  const CreateNewInvoice = () => {
    setInvoiceEdit(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const loadData = () => {
    setDummyNumber((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <MainContainer>
      <Header>
        <Title>{t("title")}</Title>

        <Button variant="primary" onClick={handleCreateDefault}>
          {t("toPdf")}
        </Button>
        <Button variant="primary" onClick={loadData}>
          load Data {dummyNumber}
        </Button>
        <Button variant="primary" onClick={CreateNewInvoice}>
          new invoice
        </Button>
      </Header>
      {!invoiceEdit && (
        <PageContent
          loading={loading}
          generatingId={generatingId}
          invoiceInfoList={invoiceInfoList}
          handleGeneratePdf={handleGeneratePdf}
        />
      )}
      {invoiceEdit && (
        <div>
          <InvoiceForm
            garageId={1}
            createdBy={"init"}
            onSuccess={() => alert("Invoice created!")}
          />
        </div>
      )}
    </MainContainer>
  );
}

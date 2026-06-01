import styled from "styled-components";
import { MainContainer } from "../../common/common.styled";
import { InvoiceState, type Invoice, type InvoiceInfo, type InvoiceLine } from "./invoice.types";
import { default as GarageSection } from "../Garage/Badge";
import { default as OwnerSection } from "../owner/Badge";
import { default as VehicleSection } from "../vehicle/Badge";
import { useEffect, useState } from "react";
import { getOwnerById } from "../owner/owner.crud";
import { _getInvoiceById } from "./invoice.service";
import { invoiceInit, ownerInit, vehicleInfoInit } from "../../common/constant";
import type { Owner } from "../owner/owner.types";
import toast from "react-hot-toast";
import { getInvoiceById, getInvoiceLineById } from "./invoice.crud";
import type { VehicleInfo } from "../vehicle/vehicle.types";
import { getVehicleInfoById } from "../vehicle/vehicle.crud";
import ActionBar from "./ActionBar";
import { useTranslation } from "react-i18next";
import moment from "moment";
import LineSection from "./LineSection";
import Agreement from "./Agreement";
import { LeftSide, RightSide, TwoHalfPage } from "./view.style";

export type ViewProps = {
  onStateChange: (state: InvoiceState, invoiceId: number) => void;
  invoiceInfo: InvoiceInfo;
};
export default function View({ ...props }: ViewProps) {
  const { t } = useTranslation(["invoice"]);

  const [invoiceLineList, setInvoiceLineList] = useState<InvoiceLine[]>([]);
  const [invoice, setInvoice] = useState<Invoice>(invoiceInit);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>(vehicleInfoInit);
  const [owner, setOwner] = useState<Owner>(ownerInit);

  useEffect(() => {
    fetchInvoice();
    fetchInvoiceLine();
    fetchVehicle();
    fetchOwner();
  }, [props.invoiceInfo]);

  //--------------------------------------------------------------------------------------------------------------------------
  const fetchOwner = async () => {
    try {
      const response = await getOwnerById(props.invoiceInfo.ownerId); // appel avec l'ID 3
      setOwner(response);
    } catch (err) {
      toast.error("Une erreur inattendue est survenue");
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const fetchInvoice = async () => {
    try {
      const response = await getInvoiceById(props.invoiceInfo.id); // appel avec l'ID 3
      setInvoice(response);
    } catch (err) {
      toast.error("Une erreur inattendue est survenue");
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const fetchVehicle = async () => {
    try {
      const response = await getVehicleInfoById(props.invoiceInfo.vehicleId); // appel avec l'ID 3
      setVehicleInfo(response);
    } catch (err) {
      toast.error("Une erreur inattendue est survenue");
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const fetchInvoiceLine = async () => {
    try {
      const response = await getInvoiceLineById(props.invoiceInfo.vehicleId); // appel avec l'ID 3
      setInvoiceLineList(response);
    } catch (err) {
      toast.error("Une erreur inattendue est survenue");
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleAction = (state: InvoiceState) => {
    props.onStateChange(state, props.invoiceInfo.id);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const issueDate = moment(props.invoiceInfo.issueDate).format("DD/MM/YYYY");
  const dueDate = moment(props.invoiceInfo.dueDate).format("DD/MM/YYYY");
  const referenceDate1 = `${t("issueDate")}: ${issueDate}`;
  const referenceDate2 = `${t("dueDate")} : ${dueDate}`;
  return (
    <MainContainer>
      <p>{props.invoiceInfo.id}</p>
      <ActionBar onAction={handleAction} />

      <InvoiceHeader>
        <LeftSide>
          <GarageSection />
        </LeftSide>
        <RightSide>
          <OwnerSection value={owner} />
          <VehicleSection value={vehicleInfo} />
          <DaysSection>{referenceDate1}</DaysSection>
          <DaysSection>{referenceDate2}</DaysSection>
        </RightSide>
      </InvoiceHeader>
      <InvoiceLine>
        <LineSection lineList={invoiceLineList} />
      </InvoiceLine>
      <Agreement />
    </MainContainer>
  );
}

const InvoiceHeader = styled(TwoHalfPage)``;

const InvoiceLine = styled.div``;
const DaysSection = styled.div`
  width: 100%;
  /* border: 1px solid blue; */
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: left;
  padding-left: ${({ theme }) => theme.spacing.sm};
`;

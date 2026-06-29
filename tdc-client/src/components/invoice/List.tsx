import { useEffect, useMemo, useState } from "react";
import { type InvoiceInfo } from "./types";
import { _getAllInvoices, _getInvoiceById, _getInvoicesInfoList } from "./service";
import { useTranslation } from "react-i18next";
import { _getGarageById } from "../garage/garage.service";
import { invoiceInfoInit } from "../../common/constant";
import styled from "styled-components";
import Badge from "./Badge";
import { Button, FilterBar, SearchInput } from "../../common/common.styled";
import { getInvoicesInfoList } from "./crud";
import type { ComponentStatus } from "../../common/commun.types";

export type ListProps = {
  onStateChange: (state: ComponentStatus) => void;
  onSelected: (invoiceInfo: InvoiceInfo) => void;
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["invoice"]);

  const [invoiceInfoList, setInvoiceInfoList] = useState<InvoiceInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Load all invoices on mount
  useEffect(() => {
    fetchInvoices();
  }, []);
  //--------------------------------------------------------------------------------------------------------------------------
  // Filter invoices based on search term
  const filteredInvoices = useMemo(() => {
    if (!searchTerm.trim()) return invoiceInfoList;

    const lowerSearch = searchTerm.toLowerCase();
    return invoiceInfoList.filter((invoice) => {
      return (
        invoice.ownerFirstName.toLowerCase().includes(lowerSearch) ||
        invoice.ownerLastName.toLowerCase().includes(lowerSearch) ||
        invoice.vehiclePlateNumber.toLowerCase().includes(lowerSearch) ||
        invoice.vehicleModel.toLowerCase().includes(lowerSearch) ||
        invoice.vehicleBrand.toLowerCase().includes(lowerSearch)
      );
    });
  }, [invoiceInfoList, searchTerm]);

  //--------------------------------------------------------------------------------------------------------------------------

  // const fetchGarage = async () => {
  //   const idGarage = getSelectedGarageId() || defaulIdGarage;
  //   if (idGarage) {
  //     const response = await _getGarageById(idGarage);
  //     if (response.success) {
  //       setCurrentGarage(response?.data || garageInit);
  //     }
  //   }
  // };
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchInvoices = async () => {
    // setLoading(true);
    try {
      const result = await getInvoicesInfoList();
      setInvoiceInfoList(result);
    } catch (err) {
      console.error("catch Error loading invoices", err);
    } finally {
      // setLoading(false);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleStateChange = (state: ComponentStatus, invoiceInfo: InvoiceInfo) => {
    console.log("handleStateChange inv 70oiceInfo", invoiceInfo);
    props.onSelected(invoiceInfo);
    props.onStateChange(state);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleClearFilter = () => {
    setSearchTerm("");
  };
  return (
    <>
      <MainContainer>
        <h1>{t("invoice")}</h1>
        <FilterBar style={{ justifyContent: "center" }}>
          <SearchInput
            type="text"
            placeholder={t("filterByOwnerOrVehicle")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button $variant="secondary" onClick={handleClearFilter}>
            {t("clearFilters")}
          </Button>
        </FilterBar>
        <ItemList>
          {filteredInvoices.map((invoiceInfo) => (
            <Badge key={invoiceInfo.id} invoice={invoiceInfo} onStateChange={handleStateChange} />
          ))}
        </ItemList>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: "100%";
  display: flex;
  flex-direction: column;
`;

const ItemList = styled.div`
  width: "100%";
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

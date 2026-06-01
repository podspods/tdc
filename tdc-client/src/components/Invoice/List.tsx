import { useEffect, useMemo, useState } from "react";
import { InvoiceState, type Invoice, type InvoiceInfo } from "./invoice.types";
import { _getAllInvoices, _getInvoiceById, _getInvoicesInfoList } from "./invoice.service";
import { useTranslation } from "react-i18next";
import { getSelectedGarageId } from "../../common/common";
import { _getGarageById } from "../Garage/garage.service";
import { defaulIdGarage, garageInit, invoiceInfoInit, invoiceInit } from "../../common/constant";
import type { Garage } from "../Garage/garage.types";
import styled from "styled-components";
import Badge from "./Badge";
import { Button, FilterBar, SearchInput } from "../../common/common.styled";
import { getInvoicesInfoList } from "./invoice.crud";

export type ListProps = {
  onStateChange: (state: InvoiceState) => void;
  onSelected: (invoiceInfo: InvoiceInfo) => void;
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["invoice"]);

  const [invoiceInfoList, setInvoiceInfoList] = useState<InvoiceInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentGarage, setCurrentGarage] = useState<Garage>(garageInit);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dummyNumber, setDummyNumber] = useState<number>(42);

  // Load all invoices on mount
  useEffect(() => {
    fetchInvoices();
    fetchGarage();
  }, [dummyNumber]);
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

  const fetchGarage = async () => {
    const idGarage = getSelectedGarageId() || defaulIdGarage;
    if (idGarage) {
      const response = await _getGarageById(idGarage);
      if (response.success) {
        setCurrentGarage(response?.data || garageInit);
      }
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const result = await getInvoicesInfoList();
      setInvoiceInfoList(result);
    } catch (err) {
      console.error("catch Error loading invoices", err);
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleStateChange = async (state: InvoiceState, invoiceId: number) => {
    const invoiceInfoSelected = invoiceInfoList.find((invoiceInfo) => invoiceInfo.id === invoiceId);
    props.onSelected(invoiceInfoSelected || invoiceInfoInit);
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
        <Button onClick={() => setDummyNumber((prev) => prev + 1)}>click</Button>
        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t("filterByOwnerOrVehicle")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="secondary" onClick={handleClearFilter}>
            {t("clearFilters")}
          </Button>
        </FilterBar>
        <ItemList>
          {filteredInvoices.map((invoiceInfo) => (
            <Badge
              key={invoiceInfo.id}
              invoice={invoiceInfo}
              onStateChange={(state, id) => handleStateChange(state, id)}
            />
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
`;

import { useTranslation } from "react-i18next";
import { Button, FilterBar, SearchInput } from "../../common/common.styled";
import type { ComponentStatus } from "../../common/commun.types";
import type { Garage } from "./garage.types";
import styled from "styled-components";
import { useMemo, useState } from "react";
import Badge from "./Badge";

export type ListProps = {
  onSelected: (garage: Garage) => void;
  onStateChange: (componentStatus: ComponentStatus) => void;
  garageList: Garage[];
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["garage"]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Load all invoices on mount

  //--------------------------------------------------------------------------------------------------------------------------
  // Filter invoices based on search term
  const filteredGarage = useMemo(() => {
    if (!searchTerm.trim()) return props.garageList;

    const lowerSearch = searchTerm.toLowerCase();
    return props.garageList.filter((garage: Garage) => {
      return (
        garage.name.toLowerCase().includes(lowerSearch) ||
        garage.address.toLowerCase().includes(lowerSearch) ||
        garage.city.toLowerCase().includes(lowerSearch) ||
        garage.bankName.toLowerCase().includes(lowerSearch) ||
        garage.phone.toLowerCase().includes(lowerSearch)
      );
    });
  }, [props.garageList, searchTerm]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleClearFilter = () => {
    setSearchTerm("");
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus, garage: Garage) => {
    props.onSelected(garage);
    props.onStateChange(state);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <FilterBar style={{ justifyContent: "center" }}>
        <SearchInput
          type="text"
          placeholder={t("filterByNameOrAddress")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button $variant="secondary" onClick={handleClearFilter}>
          {t("clearFilters")}
        </Button>
      </FilterBar>
      <ItemList>
        {filteredGarage.map((garage) => (
          <Badge key={garage.id} value={garage} listMode onAction={handleAction} />
        ))}
      </ItemList>
    </MainContainer>
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
  gap: 1rem;
`;

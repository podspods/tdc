import { useTranslation } from "react-i18next";
import { Button, FilterBar, SearchInput } from "../../common/common.styled";
import type { ComponentStatus } from "../../common/commun.types";
import styled from "styled-components";
import { useMemo, useState } from "react";
import type { Brand } from "./types";
import Badge from "./Badge";

export type ListProps = {
  onSelected: (brand: Brand) => void;
  onStateChange: (componentStatus: ComponentStatus) => void;
  brandList: Brand[];
  editMode?: boolean;
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["vehicle"]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Load all invoices on mount

  //--------------------------------------------------------------------------------------------------------------------------
  // Filter invoices based on search term
  const filteredBrand = useMemo(() => {
    if (!searchTerm.trim()) return props.brandList;

    const lowerSearch = searchTerm.toLowerCase();
    return props.brandList.filter((brand: Brand) => {
      const nameMatch = brand.name.toLowerCase().includes(lowerSearch);
      const countryMatch = brand.countryOfOrigin?.toLowerCase().includes(lowerSearch) ?? false;
      return nameMatch || countryMatch;
    });
  }, [props.brandList, searchTerm]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleClearFilter = () => {
    setSearchTerm("");
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus, brand: Brand) => {
    props.onSelected(brand);
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
        {filteredBrand.map((brand) => (
          <Badge key={brand.id} value={brand} onAction={handleAction} />
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

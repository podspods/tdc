import { useTranslation } from "react-i18next";
import { Button } from "../../common/common.styled";
import { FilterBar, SearchInput } from "../../common/common.styled";
import { useMemo, useState } from "react";
import type { Owner } from "./types";
import type { ComponentStatus } from "../../common/commun.types";
import styled from "styled-components";
import Badge from "./Badge";

export type ListProps = {
  onSelected: (owner: Owner) => void;
  onStateChange: (componentStatus: ComponentStatus) => void;
  ownerList: Owner[];
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["owner"]);
  const [searchTerm, setSearchTerm] = useState("");

  //--------------------------------------------------------------------------------------------------------------------------
  // Filter invoices based on search term
  const filteredOwner = useMemo(() => {
    if (!searchTerm.trim()) return props.ownerList;

    const lowerSearch = searchTerm.toLowerCase();
    return props.ownerList.filter((owner: Owner) => {
      return (
        owner.firstName.toLowerCase().includes(lowerSearch) ||
        owner.lastName.toLowerCase().includes(lowerSearch) ||
        owner.phoneNumber.toLowerCase().includes(lowerSearch) ||
        owner.address.toLowerCase().includes(lowerSearch) ||
        owner.city.toLowerCase().includes(lowerSearch)
      );
    });
  }, [props.ownerList, searchTerm]);
  //--------------------------------------------------------------------------------------------------------------------------
  const handleClearFilter = () => {
    setSearchTerm("");
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus, owner: Owner) => {
    props.onSelected(owner);
    props.onStateChange(state);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <MainContainer>
      <FilterBar>
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
        {filteredOwner.map((garage) => (
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
  justify-content: center;
  gap: 1rem;
`;

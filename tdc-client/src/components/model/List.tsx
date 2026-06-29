import { useTranslation } from "react-i18next";
import { Button, FilterBar, SearchInput } from "../../common/common.styled";
import type { ComponentStatus } from "../../common/commun.types";
import styled from "styled-components";
import { useMemo, useState } from "react";
import type { Model, ModelInfo } from "./types";
import Badge from "./Badge";

export type ListProps = {
  onSelected: (model: ModelInfo) => void;
  onStateChange: (componentStatus: ComponentStatus) => void;
  modelInfoList: ModelInfo[];
  editMode?: boolean;
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["vehicle"]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Load all invoices on mount

  //--------------------------------------------------------------------------------------------------------------------------
  // Filter invoices based on search term
  const filteredModel = useMemo(() => {
    if (!searchTerm.trim()) return props.modelInfoList;

    const lowerSearch = searchTerm.toLowerCase();
    return props.modelInfoList.filter((modelInfo: ModelInfo) => {
      const modelMatch = modelInfo.model.name.toLowerCase().includes(lowerSearch);
      const brandMatch = modelInfo.brand.name.toLowerCase().includes(lowerSearch) ?? false;
      return modelMatch || brandMatch;
    });
  }, [props.modelInfoList, searchTerm]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleClearFilter = () => {
    setSearchTerm("");
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus, modelInfo: ModelInfo) => {
    props.onSelected(modelInfo);
    props.onStateChange(state);
    console.log("handleAction  43", modelInfo);
    console.log("handleAction  44", state);
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
        {filteredModel.map((modelInfo) => (
          <Badge key={modelInfo.model.id} value={modelInfo} onAction={handleAction} />
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

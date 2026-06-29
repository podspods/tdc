import { useTranslation } from "react-i18next";
import { Button, FilterBar, SearchInput } from "../../common/common.styled";
import type { ComponentStatus } from "../../common/commun.types";
import type { VehicleInfo } from "./types";
import styled from "styled-components";
import { useMemo, useState } from "react";
import BadgeView from "./BadgeView";

export type ListProps = {
  onSelected: (vehicleInfo: VehicleInfo) => void;
  onStateChange: (componentStatus: ComponentStatus) => void;
  vehicleInfoList: VehicleInfo[];
  editMode?: boolean;
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["vehicle"]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Load all invoices on mount

  //--------------------------------------------------------------------------------------------------------------------------
  // Filter invoices based on search term
  const filteredVehicleInfo = useMemo(() => {
    if (!searchTerm.trim()) return props.vehicleInfoList;

    const lowerSearch = searchTerm.toLowerCase();
    return props.vehicleInfoList.filter((vehicleInfo: VehicleInfo) => {
      return (
        vehicleInfo.brand.name.toLowerCase().includes(lowerSearch) ||
        vehicleInfo.model.name.toLowerCase().includes(lowerSearch) ||
        vehicleInfo.owner.firstName.toLowerCase().includes(lowerSearch) ||
        vehicleInfo.owner.lastName.toLowerCase().includes(lowerSearch) ||
        vehicleInfo.vehicle.plateNumber.toLowerCase().includes(lowerSearch)
      );
    });
  }, [props.vehicleInfoList, searchTerm]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleClearFilter = () => {
    setSearchTerm("");
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus, vehicleInfo: VehicleInfo) => {
    props.onSelected(vehicleInfo);
    props.onStateChange(state);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      <FilterBar style={{ justifyContent: "center" }}>
        <SearchInput
          type="text"
          placeholder={t("filterBybrandOrModel")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button $variant="secondary" onClick={handleClearFilter}>
          {t("clearFilters")}
        </Button>
      </FilterBar>
      <ItemList>
        {filteredVehicleInfo.map((vehicleInfo) => (
          <BadgeView
            list={filteredVehicleInfo}
            key={vehicleInfo.vehicle.id}
            value={vehicleInfo}
            listMode
            onAction={handleAction}
            editMode={props.editMode}
          />
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

import { Button } from "../../common/common.styled";
import NewOwner from "../owner/NewOwner";
import type { Owner } from "../owner/owner.types";
import SelectOwner from "../owner/SelectOwner";
import NewVehicle from "./NewVehicle";
import SelectVehicle from "./SelectVehicle";

export type VehicleSectionProps = {
  showNewOwner: boolean;
  setShowNewOwner: (isVisible: boolean) => void;
  selectedOwnerId: number;
  setSelectedOwnerId: (id: number) => void;
  ownerList: Owner[];
};
export default function VehicleSection({ ...props }: VehicleSectionProps) {
  return (
    <>
      {/* Owner selection */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SelectOwner
          selectedOwnerId={props.selectedOwnerId}
          setSelectedOwnerId={props.setSelectedOwnerId}
          ownerList={props.ownerList}
        />

        <Button variant="secondary" onClick={() => props.setShowNewOwner(!props.showNewOwner)}>
          {props.showNewOwner ? t("cancel") : "➕ 👨‍💼"}
        </Button>
        {props.showNewOwner && (
          <NewOwner
            owner={ownerForm}
            setOwner={setOwnerForm}
            handleCreateOwner={handleCreateOwner}
          />
        )}
        {/* Vehicle selection */}
        {props.selectedOwnerId !== 0 && (
          <div style={{ marginBottom: 20 }}>
            <SelectVehicle
              selectedVehicleId={props.selectedVehicleId}
              setSelectedVehicleId={props.setSelectedVehicleId}
              filteredVehicles={filteredVehicles}
            />
            <Button variant="secondary" onClick={() => setShowNewVehicle(!showNewVehicle)}>
              {showNewVehicle ? t("cancel") : "➕ 🏍"}
            </Button>
            {showNewVehicle && (
              <NewVehicle
                vehicleForm={vehicleForm}
                setVehicleForm={setVehicleForm}
                handleCreate={handleCreateVehicle}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

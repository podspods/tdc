import { Text, View } from "@react-pdf/renderer";
import { vehicleStyles } from "./styles";
import type { VehicleInfo } from "../vehicle/types";

export type VehicleProps = {
  value: VehicleInfo;
};
export default function Vehicle({ ...props }: VehicleProps) {
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <View style={vehicleStyles.mainContainer}>
      <Text
        style={vehicleStyles.model}
      >{`${props.value.brand.name} - ${props.value.model.name} `}</Text>
      <View style={vehicleStyles.information}>
        <Text style={vehicleStyles.plateNumber}>{props.value.vehicle.plateNumber}</Text>
        <Text style={vehicleStyles.mileage}>{props.value.vehicle.mileage} km</Text>
      </View>
    </View>
  );
}

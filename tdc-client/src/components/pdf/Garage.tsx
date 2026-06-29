import { View, Image, Text } from "@react-pdf/renderer";
import { garageStyles } from "./styles";
import type { Garage } from "../garage/garage.types";

export type GarageProps = {
  value: Garage;
  garageList?: Garage[];
  editMode?: boolean;
  onChange?: (garageId: number) => void;
};
export default function Garage({ ...props }: GarageProps) {
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <View style={garageStyles.mainContainer}>
        <Text style={garageStyles.name}>{props.value.name}</Text>
        {props.value.logoUrl && <Image src={props.value.logoUrl} style={garageStyles.logo} />}
        <View style={garageStyles.footer}>
          <Text style={garageStyles.address}>
            A.{`${props.value.address}, ${props.value.city}`}
          </Text>
          <Text style={garageStyles.phone}>T.{props.value.phone}</Text>
          {/* <Text style={garageStyles.phone}>📞 {props.value.phone}</Text> */}
        </View>
      </View>
    </>
  );
}

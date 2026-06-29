import { Text, View } from "@react-pdf/renderer";
import { ownerStyles } from "./styles";
import type { Owner } from "../owner/types";

export type OwnerProps = {
  value: Owner;
};
export default function Owner({ ...props }: OwnerProps) {
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <View style={ownerStyles.mainContainer}>
      <Text style={ownerStyles.name}>
        {props.value.lastName} {props.value.firstName}
      </Text>

      {props.value.address && <Text style={ownerStyles.address}>{props.value.address}</Text>}
      {props.value.city && <Text style={ownerStyles.city}>{props.value.city}</Text>}
      {props.value.phoneNumber && (
        // <Text style={ownerStyles.phone}> 📞{props.value.phoneNumber}</Text>
        <Text style={ownerStyles.phone}>T.{props.value.phoneNumber}</Text>
      )}
    </View>
  );
}

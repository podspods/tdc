import { View, Image, Text } from "@react-pdf/renderer";
import { garageStyles, pdfStyles } from "./styles";
import type { Garage } from "../garage/garage.types";

// const MainContainer = styled.div`
//   font-size: ${({ theme }) => `${theme.fontSize.base}`};
//   color: ${({ theme }) => theme.colors.text.primary};
//   padding: ${({ theme }) => theme.spacing.md};
//   border-radius: ${({ theme }) => theme.borderRadius.md};
//   border: 1px solid black;
//   border-color: ${({ theme }) => theme.colors.text.primary};
//   width: "100%";
// `;

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

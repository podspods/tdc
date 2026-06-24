import { Text, View } from "@react-pdf/renderer";
import { ownerStyles, pdfStyles } from "./styles";
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

// export const localStyles = StyleSheet.create({

//   name: {
//     fontSize: theme.fontSize.base,
//     fontWeight: 700,
//   },

// })

// const Name = styled.div`
//   font-size: ${({ theme }) => `${theme.fontSize.base}`};
//   font-weight: 700;
// `;
// const Address = styled.div`
//   font-size: ${({ theme }) => `${theme.fontSize.xs}`};
// `;
// const City = styled(Address)``;
// const Phone = styled(Address)``;

// const MainContainer = styled.div`
//   text-align: left;
//   font-size: ${({ theme }) => `${theme.fontSize.base}`};
//   color: ${({ theme }) => theme.colors.text.primary};
//   padding: ${({ theme }) => theme.spacing.md};
//   border-radius: ${({ theme }) => theme.borderRadius.md};
//   border: 1px solid black;
//   border-color: ${({ theme }) => theme.colors.text.primary};
//   width: "100%";
// `;

// const Row = styled.div`
//   display: flex;
//   flex-direction: row;

//   width: "100%";
// `;

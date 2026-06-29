import styled from "styled-components";
import type { Owner } from "./types";
import type { ComponentStatus } from "../../common/commun.types";
import SelectBar from "../UI/SelectBar";
import { useEffect, useMemo, useState } from "react";
import { ownerInit } from "../../common/constant";
import { getOwnerList } from "./crud";
import { Select } from "../UI/Select";
import { useTranslation } from "react-i18next";
import { Button } from "../../common/common.styled";

export type BadgeProps = {
  value: Owner;
  editMode?: boolean;
  listMode?: boolean;
  setOwner?: (owner: Owner) => void;
  onNewVehicle?: () => void;
  onChange?: (ownerId: number) => void;

  onAction?: (state: ComponentStatus, owner: Owner) => void;
};
export default function Badge({ ...props }: BadgeProps) {
  const { t } = useTranslation(["owner"]);

  const [ownerList, setOwnerList] = useState<Owner[]>([]);

  useEffect(() => {
    loadOwnerList();
  }, [props.value]);

  const ownerOptionList = useMemo(() => {
    return ownerList.map((record) => ({
      value: record.id.toString(),
      label: `${record.lastName} ${record.firstName}`,
    }));
  }, [ownerList]);
  //--------------------------------------------------------------------------------------------------------------------------

  const loadOwnerList = async () => {
    const newOwnerList = await getOwnerList();
    setOwnerList(newOwnerList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnAction = (state: ComponentStatus) => {
    console.log("handleOnAction", state);
    props.onAction?.(state, props.value);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOwnerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const idSelected = Number(event.target.value);
    const newOwner: Owner = ownerList.find((record) => record.id === idSelected) || ownerInit;

    if (newOwner.id !== ownerInit.id) {
      props.setOwner?.(newOwner);
      props.onChange?.(newOwner.id);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <MainContainer>
      {props.editMode && (
        <Row>
          <Select
            label={t("owner")}
            options={ownerOptionList}
            onChange={handleOwnerChange}
            value={props.value.id}
          />
          <Button $iconOnly onClick={props.onNewVehicle} title={t("newVehicle")}>
            👨‍💼
          </Button>
        </Row>
      )}
      {props.value && (
        <>
          <Name> {`${props.value.lastName} ${props.value.firstName}`}</Name>
          <Body>
            <Address>{props.value.address}</Address>
            <City>{props.value.city}</City>
            <Phone> 📞{props.value.phoneNumber}</Phone>
          </Body>
        </>
      )}
      <Footer>{props.listMode && <SelectBar onAction={handleOnAction} />}</Footer>
    </MainContainer>
  );
}
const Row = styled.div`
  display: flex;
  flex-direction: row;

  width: "100%";
`;

const Name = styled.p`
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  font-weight: 700;
`;
const Address = styled.p`
  font-size: ${({ theme }) => `${theme.fontSize.xs}`};
`;

const City = styled(Address)``;
const Phone = styled(Address)``;

const Body = styled.div`
  font-size: ${({ theme }) => `${theme.fontSize.xs}`};
  width: 300px; /* largeur fixe */
  height: 100px; /* hauteur fixe */
  overflow: auto; /* scroll automatique en cas de dépassement */
  flex-shrink: 0; /* optionnel : empêche le rétrécissement dans un conteneur flex */
`;

const Footer = styled.div`
  font-size: ${({ theme }) => `${theme.fontSize.xs}`};
  border-top: 1px solid ${({ theme }) => `${theme.colors.border.success}`};
  padding: ${({ theme }) => `${theme.spacing.xs}`};
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid black;
  border-color: ${({ theme }) => theme.colors.text.primary};
`;

import styled from "styled-components";
import type { Owner } from "./types";
import SelectOwner from "./SelectOwner";
import { useEffect, useState } from "react";
import { ownerInit } from "../../common/constant";
import { getAllOwner } from "./crud";
import { Button } from "../../common/common.styled";
import { useTranslation } from "react-i18next";
import { Modal } from "./Modal";

export type BadgeProps = {
  value: Owner;
  editMode?: boolean;
  setOwner?: (owner: Owner) => void;
  onNewVehicle?: () => void;
};
export default function Badge({ ...props }: BadgeProps) {
  const { t } = useTranslation(["owner"]);

  const [owner, setOwner] = useState<Owner>(props.value);
  const [ownerList, setOwnerList] = useState<Owner[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    const loadOwnerList = async () => {
      const ownerList = await getAllOwner();
      setOwnerList(ownerList);
    };
    loadOwnerList();
  }, [refresh]);

  useEffect(() => {
    setOwner(props.value);
  }, [props.value]);
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOwnerSelected = (id: number) => {
    if (id !== owner.id) {
      const newOwner = ownerList.find((owner) => owner.id === id);
      setOwner(newOwner || ownerInit);
      props.setOwner?.(newOwner || ownerInit);
    }
  };
  const handleNewOwner = () => {
    setOpen(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleClose = () => {
    setOpen(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSuccess = () => {
    setRefresh((prev) => (prev = 1));
    setOpen(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <MainContainer>
      {props.editMode && (
        <Row>
          <SelectOwner
            selectedOwnerId={owner.id}
            setSelectedOwnerId={handleOwnerSelected}
            ownerList={ownerList}
          />
          <Button $iconOnly onClick={handleNewOwner} title={t("newOwner")}>
            👨‍💼
          </Button>
        </Row>
      )}

      {owner && (
        <>
          <Name> {`${owner.lastName} ${owner.firstName}`}</Name>
          <Address>{owner.address}</Address>
          <City>{owner.city}</City>
          <Phone> 📞{owner.phoneNumber}</Phone>
        </>
      )}

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        owner={owner}
        onSuccess={handleSuccess}
        setOwner={setOwner}
        onNewVehicle={props.onNewVehicle}
      />
    </MainContainer>
  );
}

const Name = styled.div`
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  font-weight: 700;
`;
const Address = styled.div`
  font-size: ${({ theme }) => `${theme.fontSize.xs}`};
`;
const City = styled(Address)``;
const Phone = styled(Address)``;

const MainContainer = styled.div`
  text-align: left;
  font-size: ${({ theme }) => `${theme.fontSize.base}`};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid black;
  border-color: ${({ theme }) => theme.colors.text.primary};
  width: "100%";
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  width: "100%";
`;

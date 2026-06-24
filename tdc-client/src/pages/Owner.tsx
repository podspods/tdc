import { useState } from "react";
import type { Owner } from "../components/owner/types";
import { Modal } from "../components/owner/Modal";
import { Button } from "../common/common.styled";
import { ownerInit } from "../common/constant";

export type OwnerProps = {};
export default function Owner({ ...props }: OwnerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner>(ownerInit);

  const openCreateModal = () => {
    setEditingOwner(ownerInit);
    setModalOpen(true);
  };

  const openEditModal = () => {
    setEditingOwner(ownerInit);
    setModalOpen(true);
  };

  const fetchOwners = () => {
    console.log("fetchOwners", fetchOwners);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleNewVehicle = () => {};
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchOwners}
        newVehicle={handleNewVehicle}
        owner={editingOwner}
        setCurrentOwner={setEditingOwner}
      />
      <Button onClick={openCreateModal}>create</Button>
      <Button onClick={openEditModal}>edit</Button>
    </>
  );
}

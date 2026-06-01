import { useState } from "react";
import type { Owner } from "../components/owner/owner.types";
import Modal from "../components/owner/Modal";
import { Button } from "../common/common.styled";
import { ownerInit } from "../common/constant";

export type OwnerProps = {};
export default function Owner({ ...props }: OwnerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);

  const openCreateModal = () => {
    setEditingOwner(null);
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

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editingOwner={editingOwner}
        onSuccess={fetchOwners}
      />
      <Button onClick={openCreateModal}>create</Button>
      <Button onClick={openEditModal}>edit</Button>
    </>
  );
}

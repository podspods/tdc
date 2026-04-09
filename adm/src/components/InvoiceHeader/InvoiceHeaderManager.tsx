import { Modal } from "../UI/Modal";
import { useState } from "react";
import type { InvoiceHeader } from "./invoiceHeader.types";
import { InvoiceHeaderList } from "./InvoiceHeaderList";
import { InvoiceHeaderForm } from "./InvoiceHeaderForm";
import { Container } from "./InvoiceHeaderManager.styled";

export function InvoiceHeaderManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHeader, setEditingHeader] = useState<InvoiceHeader | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleAdd() {
    setEditingHeader(null);
    setModalOpen(true);
  }

  function handleEdit(header: InvoiceHeader) {
    setEditingHeader(header);
    setModalOpen(true);
  }

  function handleSuccess() {
    setModalOpen(false);
    setEditingHeader(null);
    setRefreshTrigger((prev) => prev + 1);
  }

  function handleRefress() {
    setRefreshTrigger((prev) => prev + 1);
  }

  function handleCancel() {
    setModalOpen(false);
    setEditingHeader(null);
  }

  return (
    <Container>
      <InvoiceHeaderList onEdit={handleEdit} onAdd={handleAdd} refreshTrigger={refreshTrigger} />

      <Modal
        isOpen={modalOpen}
        onClose={handleCancel}
        title={editingHeader ? "Edit Invoice Header" : "New Invoice Header"}
      >
        <InvoiceHeaderForm
          initialData={editingHeader}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </Modal>
    </Container>
  );
}

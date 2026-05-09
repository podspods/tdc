import React, { useState } from "react";
import {
  Table,
  Th,
  Td,
  ActionButton,
  Button,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select,
} from "./Invoice.styled";
import type { LaborItem, PartItem, ConsumableItem } from "./Invoice.types";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";

type ItemsSectionProps = {
  title: string;
  items: any[];
  columns: { key: string; label: string; render?: (item: any) => string }[];
  onAdd: (item: any) => void;
  onDelete: (id: string) => void;
  addForm: React.ReactNode;
};

export function ItemsSection({
  title,
  items,
  columns,
  onAdd,
  onDelete,
  addForm,
}: ItemsSectionProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{title}</h3>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          + Add
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key}>{col.label}</Th>
            ))}
            <Th style={{ width: "60px" }}>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <Td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
                No items
              </Td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <Td key={col.key}>{col.render ? col.render(item) : item[col.key]}</Td>
                ))}
                <Td>
                  <ActionButton onClick={() => onDelete(item.id)}>🗑️</ActionButton>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Add {title}</ModalTitle>
              <ActionButton onClick={() => setShowModal(false)}>✕</ActionButton>
            </ModalHeader>
            <ModalBody>{addForm}</ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}

type LaborFormProps = {
  onSubmit: (item: Omit<LaborItem, "id" | "amount">) => void;
};

export function LaborForm({ onSubmit }: LaborFormProps) {
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(1);
  const [ratePerHour, setRatePerHour] = useState(350000);

  const handleSubmit = () => {
    if (description && hours > 0 && ratePerHour > 0) {
      onSubmit({ description, hours, ratePerHour });
      setDescription("");
      setHours(1);
      setRatePerHour(350000);
    }
  };

  return (
    <FormGrid>
      <FormGroup style={{ gridColumn: "1 / -1" }}>
        <Label>Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Oil Change"
        />
      </FormGroup>
      <FormGroup>
        <Label>Hours</Label>
        <Input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseFloat(e.target.value))}
          step="0.25"
          min="0"
        />
      </FormGroup>
      <FormGroup>
        <Label>Rate per Hour (VND)</Label>
        <Input
          type="number"
          value={ratePerHour}
          onChange={(e) => setRatePerHour(parseFloat(e.target.value))}
          step="1000"
          min="0"
        />
      </FormGroup>
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button variant="primary" onClick={handleSubmit}>
          Add Labor
        </Button>
      </div>
    </FormGrid>
  );
}

type PartFormProps = {
  onSubmit: (item: Omit<PartItem, "id" | "amount">) => void;
};

export function PartForm({ onSubmit }: PartFormProps) {
  const [name, setName] = useState("");
  const [reference, setReference] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  const handleSubmit = () => {
    if (name && quantity > 0 && unitPrice > 0) {
      onSubmit({ name, reference, quantity, unitPrice });
      setName("");
      setReference("");
      setQuantity(1);
      setUnitPrice(0);
    }
  };

  return (
    <FormGrid>
      <FormGroup style={{ gridColumn: "1 / -1" }}>
        <Label>Part Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Oil Filter"
        />
      </FormGroup>
      <FormGroup>
        <Label>Reference</Label>
        <Input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Part number"
        />
      </FormGroup>
      <FormGroup>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
        />
      </FormGroup>
      <FormGroup>
        <Label>Unit Price (VND)</Label>
        <Input
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
          step="1000"
          min="0"
        />
      </FormGroup>
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button variant="primary" onClick={handleSubmit}>
          Add Part
        </Button>
      </div>
    </FormGrid>
  );
}

type ConsumableFormProps = {
  onSubmit: (item: Omit<ConsumableItem, "id" | "amount">) => void;
};

export function ConsumableForm({ onSubmit }: ConsumableFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("liter");
  const [unitPrice, setUnitPrice] = useState(0);

  const handleSubmit = () => {
    if (name && quantity > 0 && unitPrice > 0) {
      onSubmit({ name, quantity, unit, unitPrice });
      setName("");
      setQuantity(1);
      setUnit("liter");
      setUnitPrice(0);
    }
  };

  return (
    <FormGrid>
      <FormGroup style={{ gridColumn: "1 / -1" }}>
        <Label>Consumable Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Engine Oil 10W40"
        />
      </FormGroup>
      <FormGroup>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
          step="0.1"
          min="0"
        />
      </FormGroup>
      <FormGroup>
        <Label>Unit</Label>
        <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="liter">Liter</option>
          <option value="ml">ML</option>
          <option value="kg">KG</option>
          <option value="piece">Piece</option>
          <option value="box">Box</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Unit Price (VND)</Label>
        <Input
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
          step="1000"
          min="0"
        />
      </FormGroup>
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button variant="primary" onClick={handleSubmit}>
          Add Consumable
        </Button>
      </div>
    </FormGrid>
  );
}

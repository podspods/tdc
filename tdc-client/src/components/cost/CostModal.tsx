import React, { useState, useEffect } from "react";
import type { Cost, CreateCostDto } from "./types";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
} from "../../common/common.styled";

type CostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCostDto) => void;
  initialData?: Cost | null;
};

export function CostModal({ isOpen, onClose, onSubmit, initialData }: CostModalProps) {
  const [form, setForm] = useState<CreateCostDto>({
    monthlyBase: 0,
    dayWork: 0,
    hourWork: 0,
    effectiveDate: new Date().toISOString().split("T")[0],
    endDate: null,
    createdBy: "admin",
  });
  const [noEndDate, setNoEndDate] = useState(true);

  useEffect(() => {
    if (initialData) {
      setForm({
        monthlyBase: initialData.monthlyBase,
        dayWork: initialData.dayWork,
        hourWork: initialData.hourWork,
        effectiveDate: initialData.effectiveDate,
        endDate: initialData.endDate,
        createdBy: "admin",
      });
      setNoEndDate(!initialData.endDate);
    } else {
      setForm({
        monthlyBase: 0,
        dayWork: 0,
        hourWork: 0,
        effectiveDate: new Date().toISOString().split("T")[0],
        endDate: null,
        createdBy: "admin",
      });
      setNoEndDate(true);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "noEndDate") {
        setNoEndDate(checked);
        setForm((prev) => ({ ...prev, endDate: checked ? null : "" }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (!form.monthlyBase || !form.effectiveDate) {
      alert("Monthly base and effective date are required");
      return;
    }
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{initialData ? "Edit Cost" : "New Cost"}</ModalTitle>
          <button onClick={onClose}>✕</button>
        </ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: 12 }}>
            <Label>Monthly Base (VND) *</Label>
            <Input
              type="number"
              name="monthlyBase"
              value={form.monthlyBase}
              onChange={handleChange}
              step="1000"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <Label>Day Work (VND)</Label>
            <Input
              type="number"
              name="dayWork"
              value={form.dayWork}
              onChange={handleChange}
              step="1000"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <Label>Hour Work (VND)</Label>
            <Input
              type="number"
              name="hourWork"
              value={form.hourWork}
              onChange={handleChange}
              step="1000"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <Label>Effective Date *</Label>
            <Input
              type="date"
              name="effectiveDate"
              value={form.effectiveDate}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" name="noEndDate" checked={noEndDate} onChange={handleChange} />
              No end date (valid indefinitely)
            </label>
          </div>
          {!noEndDate && (
            <div style={{ marginBottom: 12 }}>
              <Label>End Date</Label>
              <Input
                type="date"
                name="endDate"
                value={form.endDate || ""}
                onChange={handleChange}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button $variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button $variant="primary" onClick={handleSubmit}>
            {initialData ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

import React, { useState, useEffect } from "react";
import type { InvoiceFormData, Owner, Vehicle } from "./Invoice.types";
import { FormGrid, FormGroup, Label, Input, Select, Button, Textarea } from "./Invoice.styled";
import { useTranslation } from "react-i18next";

type InvoiceFormProps = {
  initialData?: InvoiceFormData;
  owners: Owner[];
  vehicles: Vehicle[];
  onSubmit: (data: InvoiceFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
};

export function InvoiceForm({
  initialData,
  owners,
  vehicles,
  onSubmit,
  onCancel,
  isLoading,
}: InvoiceFormProps) {
  const { t } = useTranslation(["invoice"]);

  const [formData, setFormData] = useState<InvoiceFormData>({
    ownerId: 0,
    registrationId: 0,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    taxRate: 10,
    notes: "",
    terms: "Payment due within 30 days. Late payments may incur additional fees.",
  });

  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (formData.ownerId > 0) {
      const ownerVehicles = vehicles.filter((v) => v.ownerId === formData.ownerId);
      setFilteredVehicles(ownerVehicles);
    } else {
      setFilteredVehicles([]);
    }
  }, [formData.ownerId, vehicles]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid>
        <FormGroup>
          <Label>{t("owner")}</Label>
          <Select name="ownerId" value={formData.ownerId} onChange={handleChange} required>
            <option value={0}>{t("selectOwner")}</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} - {owner.phone}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>{t("Vehicle")}</Label>
          <Select
            name="registrationId"
            value={formData.registrationId}
            onChange={handleChange}
            required
            disabled={formData.ownerId === 0}
          >
            <option value={0}>{t("selectVehicle")}</option>
            {filteredVehicles.map((vehicle) => (
              <option key={vehicle.registrationId} value={vehicle.registrationId}>
                {vehicle.plateNumber} - {vehicle.brand} {vehicle.model}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>{t("issueDate")}</Label>
          <Input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("dueDate")}</Label>
          <Input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("taxRate")}</Label>
          <Input
            type="number"
            name="taxRate"
            value={formData.taxRate}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.1"
          />
        </FormGroup>

        <FormGroup style={{ gridColumn: "1 / -1" }}>
          <Label>{t("notes")}</Label>
          <Textarea name="notes" value={formData.notes} onChange={handleChange} />
        </FormGroup>

        <FormGroup style={{ gridColumn: "1 / -1" }}>
          <Label>{t("termsConditions")}</Label>
          <Textarea name="terms" value={formData.terms} onChange={handleChange} />
        </FormGroup>
      </FormGrid>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
}

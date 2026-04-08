import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as invoiceHeaderService from "./invoiceHeader.service";
import { type InvoiceHeader, type CreateInvoiceHeaderDto } from "./invoiceHeader.types";
import {
  ButtonGroup,
  CancelButton,
  Checkbox,
  CheckboxGroup,
  Form,
  FormGrid,
  FormGroup,
  Input,
  Label,
  SectionTitle,
  SubmitButton,
  Textarea,
} from "./InvoiceHeaderForm.styled";

type InvoiceHeaderFormProps = {
  initialData?: InvoiceHeader | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export function InvoiceHeaderForm({ initialData, onSuccess, onCancel }: InvoiceHeaderFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateInvoiceHeaderDto>({
    name: "",
    isDefault: false,
    isActive: true,
    companyName: "",
    companyLogo: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    taxCode: "",
    bankName: "",
    bankAccount: "",
    bankAccountName: "",
    footerText: "",
    termsAndConditions: "",
    createdBy: "admin",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        isDefault: initialData.isDefault,
        isActive: initialData.isActive,
        companyName: initialData.companyName,
        companyLogo: initialData.companyLogo || "",
        companyAddress: initialData.companyAddress,
        companyPhone: initialData.companyPhone,
        companyEmail: initialData.companyEmail || "",
        companyWebsite: initialData.companyWebsite || "",
        taxCode: initialData.taxCode || "",
        bankName: initialData.bankName || "",
        bankAccount: initialData.bankAccount || "",
        bankAccountName: initialData.bankAccountName || "",
        footerText: initialData.footerText || "",
        termsAndConditions: initialData.termsAndConditions || "",
        createdBy: "admin",
      });
    }
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Header name is required");
      return;
    }
    if (!formData.companyName.trim()) {
      toast.error("Company name is required");
      return;
    }
    if (!formData.companyAddress.trim()) {
      toast.error("Company address is required");
      return;
    }
    if (!formData.companyPhone.trim()) {
      toast.error("Company phone is required");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (initialData) {
        response = await invoiceHeaderService.updateInvoiceHeader(initialData.id, formData);
      } else {
        response = await invoiceHeaderService.createInvoiceHeader(formData);
      }

      if (response.success) {
        toast.success(initialData ? "Header updated" : "Header created");
        onSuccess();
      } else {
        toast.error(response.error || "Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrid>
        <FormGroup>
          <Label>Header Name *</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Default Header, Premium Header"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Name *</Label>
          <Input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your company name"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Logo URL</Label>
          <Input
            name="companyLogo"
            value={formData.companyLogo}
            onChange={handleChange}
            placeholder="/images/logo.png"
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Address *</Label>
          <Input
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            placeholder="Full address"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Phone *</Label>
          <Input
            name="companyPhone"
            value={formData.companyPhone}
            onChange={handleChange}
            placeholder="028 1234 5678"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Email</Label>
          <Input
            name="companyEmail"
            type="email"
            value={formData.companyEmail}
            onChange={handleChange}
            placeholder="contact@company.com"
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Website</Label>
          <Input
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="www.company.com"
          />
        </FormGroup>

        <FormGroup>
          <Label>Tax Code</Label>
          <Input
            name="taxCode"
            value={formData.taxCode}
            onChange={handleChange}
            placeholder="1234567890"
          />
        </FormGroup>

        <FormGroup>
          <Label>Bank Name</Label>
          <Input
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Vietcombank"
          />
        </FormGroup>

        <FormGroup>
          <Label>Bank Account</Label>
          <Input
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="123456789"
          />
        </FormGroup>

        <FormGroup>
          <Label>Bank Account Name</Label>
          <Input
            name="bankAccountName"
            value={formData.bankAccountName}
            onChange={handleChange}
            placeholder="Account holder name"
          />
        </FormGroup>
      </FormGrid>

      <SectionTitle>Footer & Terms</SectionTitle>

      <FormGrid>
        <FormGroup>
          <Label>Footer Text</Label>
          <Textarea
            name="footerText"
            value={formData.footerText}
            onChange={handleChange}
            placeholder="Thank you for your business!"
            rows={2}
          />
        </FormGroup>

        <FormGroup>
          <Label>Terms and Conditions</Label>
          <Textarea
            name="termsAndConditions"
            value={formData.termsAndConditions}
            onChange={handleChange}
            placeholder="Payment terms..."
            rows={3}
          />
        </FormGroup>
      </FormGrid>

      <SectionTitle>Options</SectionTitle>

      <FormGrid>
        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          <Label>Set as default header</Label>
        </CheckboxGroup>

        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <Label>Active</Label>
        </CheckboxGroup>
      </FormGrid>

      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Header" : "Create Header"}
        </SubmitButton>
      </ButtonGroup>
    </Form>
  );
}

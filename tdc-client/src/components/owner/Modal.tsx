// src/components/owner/Modal.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
} from "../../common/common.styled";
import { _createOwner, _updateOwner } from "./service";
import type { Owner, CreateOwnerDto, UpdateOwnerDto } from "./owner.types";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";
import { _getAllCorrespondances } from "../correspondance/service";
import { ownerCategorySubjectCode, ownerInit, ownerStatusSubjectCode } from "../../common/constant";
import { Select } from "../UI/Select";
import type { OptionValue } from "../../common/commun.types";
import toast from "react-hot-toast";

// Form grid for two columns on larger screens
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  owner: Owner; // null = creation mode
  onSuccess: () => void; // refresh parent list
  setCurrentOwner: (owner: Owner) => void;
};

export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["owner"]);
  const [loading, setLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<CreateOwnerDto>(ownerInit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOptionList, setCategoryOptionList] = useState<OptionValue[]>([]);
  const [statusOptionList, setStatusOptionList] = useState<OptionValue[]>([]);

  // Sync form with props.owner when modal opens

  const fetchCorrespondance = async () => {
    setLoading(true);

    try {
      const response = await _getAllCorrespondances({ limit: -1 });
      if (response.success && response.data) {
        const categoryOptionListInput: OptionValue[] = response.data
          .filter((row) => row.subjectCode === ownerCategorySubjectCode)
          .map((ownerCat) => ({ value: ownerCat.code.toString(), label: ownerCat.valueStr }));
        setCategoryOptionList(categoryOptionListInput);

        const statusOptionListInput: OptionValue[] = response.data
          .filter((row) => row.subjectCode === ownerStatusSubjectCode)
          .map((ownerCat) => ({ value: ownerCat.code.toString(), label: ownerCat.valueStr }));
        setStatusOptionList(statusOptionListInput);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorrespondance();
  }, []);

  useEffect(() => {
    if (props.owner) {
      setFormData({
        firstName: props.owner.firstName,
        lastName: props.owner.lastName,
        phoneNumber: props.owner.phoneNumber,
        address: props.owner.address || "",
        city: props.owner.city || "",
        email: props.owner.email || "",
        category: props.owner.category,
        status: props.owner.status,
        notes: props.owner.notes || "",
        createdBy: props.owner.createdBy,
        createdAt: props.owner.createdAt,
        updatedAt: new Date(),
      });
    } else {
      // Reset form for creation, but keep current user for createdBy
      setFormData({
        ...ownerInit,
        createdBy: localStorage.getItem("userName") || "system",
      });
    }
  }, [props.owner, props.isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;
    if (type === "number") {
      parsedValue = value === "" ? 0 : Number(value);
    }
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const validate = (): boolean => {
    if (!formData.firstName.trim()) {
      alert(t("validation.firstNameRequired"));
      return false;
    }
    if (!formData.lastName.trim()) {
      alert(t("validation.lastNameRequired"));
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      alert(t("validation.phoneRequired"));
      return false;
    }
    if (!formData.createdBy) {
      alert(t("validation.createdByRequired"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (props.owner.id > 0) {
        // Update mode: only send updatable fields (UpdateOwnerDto)
        const updatePayload: UpdateOwnerDto = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          city: formData.city,
          email: formData.email,
          category: formData.category,
          status: formData.status,
          notes: formData.notes,
          updatedAt: new Date(),
        };
        const response = await _updateOwner(props.owner.id, updatePayload);
        if (response.success) {
          props.setCurrentOwner({
            ...formData,
            id: response.data?.id || 0,
            createdBy: props.owner.createdBy,
            createdAt: props.owner.createdAt,
          });
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message || t("updateFailed"));
        }
      } else {
        // Create mode
        const createPayload: CreateOwnerDto = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          city: formData.city,
          email: formData.email,
          category: formData.category,
          status: formData.status,
          notes: formData.notes,
          createdBy: formData.createdBy,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const response = await _createOwner(createPayload);
        if (response.success) {
          props.setCurrentOwner({ ...formData, id: response.data?.id || 0 });
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message || t("createFailed"));
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(t("saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!props.isOpen) return null;

  return (
    <ModalOverlay onClick={props.onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{props.owner ? t("editOwner") : t("addOwner")}</ModalTitle>
          <Button variant="secondary" onClick={props.onClose}>
            ✖
          </Button>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGrid>
              {/* First name */}
              <FormGroup>
                <Input
                  label={t("firstName")}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              {/* Last name */}
              <FormGroup>
                <Input
                  label={t("lastName")}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              {/* Phone number */}
              <FormGroup>
                <Input
                  label={t("phoneNumber")}
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              {/* Email */}
              <FormGroup>
                <Input
                  label={t("email")}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>

              {/* Address */}
              <FormGroup>
                <Input
                  label={t("address")}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormGroup>

              {/* City */}
              <FormGroup>
                <Input
                  label={t("city")}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </FormGroup>

              {/* Category */}
              <FormGroup>
                <Select
                  label={t("category")}
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={categoryOptionList}
                />
              </FormGroup>

              {/* Status */}
              <FormGroup>
                <Select
                  label={t("status")}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusOptionList}
                />
              </FormGroup>

              {/* Notes - full width */}
              <FullWidth>
                <FormGroup>
                  <Textarea
                    label={t("notes")}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </FormGroup>
              </FullWidth>

              {/* createdBy (readonly in edit mode, but still visible) */}
              <FullWidth>
                <FormGroup>
                  <Input
                    label={t("createdBy")}
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleChange}
                    disabled={!!props.owner}
                    required
                  />
                </FormGroup>
              </FullWidth>
            </FormGrid>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? t("saving") : t("save")}
            </Button>
            <Button type="button" variant="secondary" onClick={props.onClose}>
              {t("cancel")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

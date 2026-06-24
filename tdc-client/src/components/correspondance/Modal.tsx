import { useEffect, useState } from "react";
import type { Correspondance, CreateCorrespondanceDto, UpdateCorrespondanceDto } from "./types";
import { useTranslation } from "react-i18next";
import { correspondanceInit } from "../../common/constant";
import { _createCorrespondance, _updateCorrespondance } from "./service";
import {
  Button,
  FormGrid,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";

export type ModalProps = {
  setModalOpen: (isOpen: boolean) => void;
  editingItem: Correspondance | null;
  fetchCorrespondances: () => Promise<void>;
};

export default function Modal({ ...props }: ModalProps) {
  const { t } = useTranslation(["correspondance"]);

  const [formData, setFormData] = useState<Correspondance>(correspondanceInit);

  useEffect(() => {
    if (props.editingItem) {
      setFormData(props.editingItem);
    } else {
      setFormData(correspondanceInit);
    }
  }, [props.editingItem]);
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    // if (!formData.subjectCode || !formData.code || !formData.value || !formData.createdBy) {
    //   alert("Please fill in all required fields (subjectCode, code, value, createdBy)");
    //   return;
    // }

    try {
      if (props.editingItem) {
        const updateData: UpdateCorrespondanceDto = {
          subjectCode: formData.subjectCode,
          code: formData.code,
          valueStr: formData.valueStr,
          valueNum: formData.valueNum,
          description: formData.description,
          sortOrder: formData.sortOrder,
        };
        const response = await _updateCorrespondance(props.editingItem.id, updateData);
        if (response.success) {
          await props.fetchCorrespondances();
          props.setModalOpen(false);
        } else {
          alert(response.message || "Update failed");
        }
      } else {
        const createData: CreateCorrespondanceDto = {
          subjectCode: formData.subjectCode,
          code: formData.code,
          valueStr: formData.valueStr,
          valueNum: formData.valueNum,
          description: formData.description,
          sortOrder: formData.sortOrder,
          createdBy: formData.createdBy,
        };
        const response = await _createCorrespondance(createData);
        if (response.success) {
          await props.fetchCorrespondances();
          props.setModalOpen(false);
        } else {
          alert(response.message || "Creation failed");
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving");
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "subjectCode" || name === "code" || name === "sortOrder"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <ModalOverlay onClick={() => props.setModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2></h2>
          <ModalHeader>
            <ModalTitle>
              {props.editingItem ? t("editCorrespondance") : t("addCorrespondance")}
            </ModalTitle>
            <Button onClick={() => props.setModalOpen(false)}>❌</Button>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <Input
                  label={t("subjectCode")}
                  type="number"
                  name="subjectCode"
                  value={formData.subjectCode}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label={t("code")}
                  type="number"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label={t("sortOrder")}
                  type="number"
                  name="sortOrder"
                  value={formData.sortOrder}
                  onChange={handleInputChange}
                />
                <Input
                  label={t("valueStr")}
                  type="text"
                  name="valueStr"
                  value={formData.valueStr}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label={t("valueNum")}
                  type="text"
                  name="valueNum"
                  value={formData.valueNum}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label={t("createdBy")}
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleInputChange}
                  required
                />
              </FormGrid>

              <Textarea
                label={t("description")}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />

              <div className="modal-buttons">
                <Button type="submit" $variant="success">
                  ✔
                </Button>
                <Button type="button" $variant="warning" onClick={() => props.setModalOpen(false)}>
                  🔄
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

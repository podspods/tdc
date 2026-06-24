import { useTranslation } from "react-i18next";
import {
  Button,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";
import { Input } from "../UI/Input";
import { useEffect, useState } from "react";
import { Select } from "../UI/Select";
import type { OptionValue } from "../../common/commun.types";
import type { Correspondance } from "../correspondance/types";
import { getCorrespondanceBySubject } from "../correspondance/crud";
import {
  allBrand,
  categoryTaskSubjectCode,
  lineTypeSubjectCode,
  partAndLaborInit,
  skillLevelSubjectCode,
  subCategoryTaskSubjectCode,
  taskTypeLine,
} from "../../common/constant";
import type { Brand } from "../brand/types";
import { getBrandList } from "../brand/crud";
import type { PartAndLabor } from "./types";
import { _getAllPartAndLabor } from "./service";
import { AddPartAndLabor, UpdatePartAndLabor } from "./crud";
import toast from "react-hot-toast";
import styled from "styled-components";

export type ModalCreateProps = {
  isOpen: boolean;
  editMode?: boolean;
  partAndLabor?: PartAndLabor;
  onClose: () => void;
};

export function ModalCreate({ ...props }: ModalCreateProps) {
  if (!props.isOpen) return null;

  const { t } = useTranslation(["correspondance", "partAndLabor", "partAndLaborDb"]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [typeLineOptionList, setTypeLineOptionList] = useState<OptionValue[]>([]);
  const [categoryOptionList, setCategoryOptionList] = useState<OptionValue[]>([]);
  const [subCategoryOptionList, setSubCategoryOptionList] = useState<OptionValue[]>([]);
  const [brandOptionList, setBrandOptionList] = useState<OptionValue[]>([]);
  const [skillLevelOptionList, setSkillLevelOptionList] = useState<OptionValue[]>([]);

  const [currentPartAndLabor, setCurrentPartAndLabor] = useState<PartAndLabor>(
    props?.partAndLabor || {
      ...partAndLaborInit,
      brandCode: allBrand,
    },
  );

  useEffect(() => {
    loadLineType();
    loadCategory();
    loadSubCategory();
    loadBrand();
    loadSkillLevel();
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------
  const loadSkillLevel = async () => {
    const skillLevelList: Correspondance[] =
      await getCorrespondanceBySubject(skillLevelSubjectCode);
    const newSkillLevelOptionList: OptionValue[] = skillLevelList.map((lineType) => ({
      value: lineType.code.toString(),
      label: t(`correspondance:${lineType.valueStr}`),
    }));

    setSkillLevelOptionList(newSkillLevelOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadLineType = async () => {
    const lineTypeList: Correspondance[] = await getCorrespondanceBySubject(lineTypeSubjectCode);
    const newtypeLineOptionList: OptionValue[] = lineTypeList.map((lineType) => ({
      value: lineType.valueStr,
      label: t(lineType.description),
    }));

    setTypeLineOptionList(newtypeLineOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadCategory = async () => {
    const categoryList: Correspondance[] =
      await getCorrespondanceBySubject(categoryTaskSubjectCode);
    const newCategoryOptionList: OptionValue[] = categoryList.map((lineType) => ({
      value: lineType.valueStr,
      // label: `${lineType.valueStr} - ${t(lineType.description)}`,
      label: t(lineType.description),
    }));
    setCategoryOptionList(newCategoryOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadSubCategory = async () => {
    const subCategoryList: Correspondance[] = await getCorrespondanceBySubject(
      subCategoryTaskSubjectCode,
    );
    const newSubCategoryOptionList: OptionValue[] = subCategoryList.map((lineType) => ({
      value: lineType.valueStr,
      // label: `${lineType.valueStr} - ${t(lineType.description)}`,
      label: t(lineType.description),
    }));
    setSubCategoryOptionList(newSubCategoryOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadBrand = async () => {
    const brandList: Brand[] = await getBrandList();
    const newBrandOptionList: OptionValue[] = brandList.map((brand) => ({
      value: brand.code,
      label: brand.name,
    }));
    setBrandOptionList(newBrandOptionList);
  };

  //--------------------------------------------------------------------------------------------------------------------------

  // const calculatePrice = async (partAndLabor: PartAndLabor): Promise<number> => {
  //   switch (partAndLabor.typeLineCode) {
  //     case taskTypeLine: {
  //       const baseSalary = (await getCorrespondanceBySubjectAndCode(baseSalarySubjectCode, 1)) || 0;
  //       const skillCoefficient =
  //         (await getCorrespondanceBySubjectAndCode(
  //           salaryPositionSubjectCode,
  //           partAndLabor.skillLevel,
  //         )) || 0;
  //       const skillReelCoefficient = Math.max(skillCoefficient.valueNum, 1);
  //       return (baseSalary.valueNum * skillReelCoefficient * partAndLabor.duration) / 60;
  //     }
  //     default:
  //       return (partAndLabor.cost * (100 + partAndLabor.margin)) / 100;
  //   }

  //   return 0;
  // };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSave = async () => {
    setIsSubmitting(true);
    if (currentPartAndLabor.typeLineCode === partAndLaborInit.typeLineCode) {
      toast.error("typeLineCode missing");
      setIsSubmitting(false);

      return;
    }
    if (currentPartAndLabor.categoryCode === partAndLaborInit.categoryCode) {
      toast.error("categoryCode missing");
      setIsSubmitting(false);
      return;
    }
    if (currentPartAndLabor.subCategoryCode === partAndLaborInit.subCategoryCode) {
      toast.error("subCategoryCode missing");
      setIsSubmitting(false);
      return;
    }
    if (currentPartAndLabor.brandCode === partAndLaborInit.brandCode) {
      toast.error("brandCode missing");
      setIsSubmitting(false);
      return;
    }

    if (currentPartAndLabor.name === partAndLaborInit.name) {
      toast.error("name missing");
      setIsSubmitting(false);
      return;
    }
    if (currentPartAndLabor.description === partAndLaborInit.description) {
      toast.error("description missing");
      setIsSubmitting(false);
      return;
    }
    if (currentPartAndLabor.typeLineCode === taskTypeLine) {
      if (!currentPartAndLabor.duration) {
        toast.error("duration missing");
        setIsSubmitting(false);
        return;
      }
      if (!currentPartAndLabor.skillLevel) {
        toast.error("skillLevel missing");
        setIsSubmitting(false);
        return;
      }
    } else {
      if (!currentPartAndLabor.cost) {
        toast.error("cost missing");
        setIsSubmitting(false);
        return;
      }
      if (!currentPartAndLabor.margin) {
        toast.error("margin missing");
        setIsSubmitting(false);
        return;
      }
    }
    console.log("currentPartAndLabor 204", currentPartAndLabor);
    currentPartAndLabor.id === partAndLaborInit.id
      ? await AddPartAndLabor(currentPartAndLabor)
      : await UpdatePartAndLabor(currentPartAndLabor);
    //--------------------------------------------------------------------------------------------------------------------------
    setIsSubmitting(false);

    props.onClose();
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      duration: Number(event.target.value),
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSkillLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      skillLevel: Number(event.target.value),
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      cost: Number(event.target.value),
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleMarginChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      margin: Number(event.target.value),
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleTypeLineChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const typeLineCode = event.target.value === t("all") ? "__" : event.target.value;
    const categoryCode =
      currentPartAndLabor.categoryCode === partAndLaborInit.categoryCode
        ? "__"
        : currentPartAndLabor.categoryCode;
    const subCategoryCode =
      currentPartAndLabor.subCategoryCode === partAndLaborInit.subCategoryCode
        ? "__"
        : currentPartAndLabor.subCategoryCode;
    const brandCode =
      currentPartAndLabor.brandCode === t("all") ? "AL" : currentPartAndLabor.brandCode;
    const idCode =
      currentPartAndLabor.id === partAndLaborInit.id
        ? 999999
        : String(currentPartAndLabor.id).padStart(4, "0");
    const newCode = `${typeLineCode}${categoryCode}${subCategoryCode}${brandCode}${idCode}`;
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      code: newCode,
      typeLineCode: typeLineCode,
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const typeLineCode =
      currentPartAndLabor.typeLineCode === partAndLaborInit.typeLineCode
        ? "__"
        : currentPartAndLabor.typeLineCode;
    const categoryCode = event.target.value;

    const subCategoryCode =
      currentPartAndLabor.subCategoryCode === partAndLaborInit.subCategoryCode
        ? "__"
        : currentPartAndLabor.subCategoryCode;
    const brandCode =
      currentPartAndLabor.brandCode === t("all") ? "AL" : currentPartAndLabor.brandCode;

    const idCode =
      currentPartAndLabor.id === partAndLaborInit.id
        ? 999999
        : String(currentPartAndLabor.id).padStart(4, "0");
    const newCode = `${typeLineCode}${categoryCode}${subCategoryCode}${brandCode}${idCode}`;
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      code: newCode,
      categoryCode: categoryCode,
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const typeLineCode =
      currentPartAndLabor.typeLineCode === partAndLaborInit.typeLineCode
        ? "__"
        : currentPartAndLabor.typeLineCode;
    const categoryCode =
      currentPartAndLabor.categoryCode === partAndLaborInit.categoryCode
        ? "__"
        : currentPartAndLabor.categoryCode;
    const subCategoryCode = event.target.value === ".." ? "_" : event.target.value;
    event.target.value;

    const brandCode =
      currentPartAndLabor.brandCode === t("all") ? "AL" : currentPartAndLabor.brandCode;
    const idCode =
      currentPartAndLabor.id === partAndLaborInit.id
        ? 999999
        : String(currentPartAndLabor.id).padStart(4, "0");

    console.log("idCode 314", idCode);
    const newCode = `${typeLineCode}${categoryCode}${subCategoryCode}${brandCode}${idCode}`;
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      code: newCode,
      subCategoryCode: subCategoryCode,
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const typeLineCode =
      currentPartAndLabor.typeLineCode === partAndLaborInit.typeLineCode
        ? "__"
        : currentPartAndLabor.typeLineCode;
    const categoryCode =
      currentPartAndLabor.categoryCode === partAndLaborInit.categoryCode
        ? "__"
        : currentPartAndLabor.categoryCode;
    const subCategoryCode =
      currentPartAndLabor.subCategoryCode === partAndLaborInit.subCategoryCode
        ? "__"
        : currentPartAndLabor.subCategoryCode;
    const brandCode = event.target.value === t("all") ? "AL" : event.target.value;

    const idCode =
      currentPartAndLabor.id === partAndLaborInit.id
        ? 999999
        : String(currentPartAndLabor.id).padStart(4, "0");
    const newCode = `${typeLineCode}${categoryCode}${subCategoryCode}${brandCode}${idCode}`;

    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      code: newCode,
      brandCode: brandCode,
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  const handeDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      description: event.target.value,
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPartAndLabor: PartAndLabor = {
      ...currentPartAndLabor,
      name: event.target.value,
    };
    setCurrentPartAndLabor(newPartAndLabor);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const _witdh = "22%";
  return (
    <ModalOverlay onClick={props.onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{t("partAndLaborDb:title")}</ModalTitle>
          <Button variant="secondary" onClick={props.onClose}>
            ✖
          </Button>
        </ModalHeader>
        <ModalBody>
          <SelectBar>
            <Select
              width={_witdh}
              label={t("partAndLabor:typeLine")}
              options={typeLineOptionList}
              value={currentPartAndLabor.typeLineCode}
              onChange={handleTypeLineChange}
              placeholder={t("all")}
            />
            <Select
              width={_witdh}
              label={t("partAndLabor:category")}
              options={categoryOptionList}
              value={currentPartAndLabor.categoryCode}
              onChange={handleCategoryChange}
              placeholder={t("all")}
            />
            <Select
              width={_witdh}
              label={t("partAndLabor:subCategory")}
              options={subCategoryOptionList}
              value={currentPartAndLabor.subCategoryCode}
              onChange={handleSubCategoryChange}
              placeholder={t("all")}
            />
            <Select
              width={_witdh}
              label={t("partAndLabor:brand")}
              placeholder={t("all")}
              options={brandOptionList}
              value={currentPartAndLabor.brandCode}
              onChange={handleBrandChange}
            />
          </SelectBar>
          <Row>
            <Input width="48%" label={t("code")} value={currentPartAndLabor.code} readOnly />
            <Input
              width="48%"
              label={t("partAndLabor:name")}
              value={
                currentPartAndLabor.id !== partAndLaborInit.id
                  ? t(`partAndLaborDb:${currentPartAndLabor.code}`)
                  : currentPartAndLabor.name
              }
              onChange={handeNameChange}
            />
          </Row>
          <Row>
            <Input
              width="100%"
              label={t("partAndLaborDb:description")}
              value={currentPartAndLabor.description}
              onChange={handeDescriptionChange}
            />
          </Row>
          {currentPartAndLabor.typeLineCode === taskTypeLine && (
            <Row>
              <Input
                width="48%"
                label={t("partAndLabor:duration")}
                type="number"
                name="duration"
                value={
                  currentPartAndLabor.duration === partAndLaborInit.duration
                    ? ""
                    : currentPartAndLabor.duration
                }
                onChange={handleDurationChange}
                required
              />

              <Select
                width="48%"
                label={t("partAndLabor:skillLevel")}
                options={skillLevelOptionList}
                value={
                  currentPartAndLabor.skillLevel === partAndLaborInit.skillLevel
                    ? ""
                    : currentPartAndLabor.skillLevel
                }
                onChange={handleSkillLevelChange}
              />
            </Row>
          )}
          {currentPartAndLabor.typeLineCode !== taskTypeLine &&
            currentPartAndLabor.typeLineCode !== partAndLaborInit.typeLineCode && (
              <Row>
                <Input
                  width="48%"
                  label={t("partAndLabor:cost")}
                  type="number"
                  name="cost"
                  step={1000}
                  min={10000}
                  value={currentPartAndLabor.cost}
                  // value={
                  //   currentPartAndLabor.cost === partAndLaborInit.cost
                  //     ? ""
                  //     : currentPartAndLabor.cost
                  // }
                  onChange={handleCostChange}
                  required
                />
                <Input
                  width="48%"
                  label={t("partAndLabor:margin")}
                  type="number"
                  name="margin"
                  value={currentPartAndLabor.margin}
                  // value={
                  //   currentPartAndLabor.margin === partAndLaborInit.margin
                  //     ? ""
                  //     : currentPartAndLabor.margin
                  // }
                  onChange={handleMarginChange}
                  required
                  min={100}
                  step={10}
                />
              </Row>
            )}
        </ModalBody>
        <ModalFooter>
          <Button type="button" $variant="primary" disabled={isSubmitting} onClick={handleSave}>
            {isSubmitting ? t("partAndLabor:saving") : t("partAndLabor:save")}
          </Button>
          <Button type="button" $variant="secondary" onClick={props.onClose}>
            {t("partAndLabor:cancel")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

const SelectBar = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ModalBody = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;
export const Row = styled(ModalBody)``;

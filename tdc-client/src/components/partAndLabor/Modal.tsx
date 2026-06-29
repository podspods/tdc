import { useTranslation } from "react-i18next";
import {
  Button,
  FormGrid,
  ModalBody,
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
import {
  getCorrespondanceBySubject,
  getCorrespondanceBySubjectAndCode,
} from "../correspondance/crud";
import {
  baseSalarySubjectCode,
  categoryTaskSubjectCode,
  correspondanceInit,
  InvoiceLineInit,
  lineTypeSubjectCode,
  partAndLaborInit,
  salaryPositionSubjectCode,
  subCategoryTaskSubjectCode,
  taskTypeLine,
} from "../../common/constant";
import type { Brand } from "../brand/types";
import { getBrandList } from "../brand/crud";
import type { PartAndLabor } from "./types";
import { _getAllPartAndLabor } from "./service";
import { getAllPartAndLabor } from "./crud";
import type { CreateInvoiceLineDto, InvoiceLine } from "../invoice/types";
import { addInvoiceLine } from "../invoice/crud";
import toast from "react-hot-toast";

export type PartAndLaborFilter = {
  typeLineCode: string;
  catgoryCode: string;
  subCatgoryCode: string;
  brandCode: string;
};

export const partAndLaborFilterInit: PartAndLaborFilter = {
  typeLineCode: "",
  catgoryCode: "",
  subCatgoryCode: "",
  brandCode: "",
};

export type ModalProps = {
  isOpen: boolean;
  editMode?: boolean;
  invoiceId: number;
  typeLineId: number;
  onNewInvoiceLine?: (isOpen: boolean) => void;
  onClose?: () => void;
  onSuccess?: () => void;
};

export function Modal({ ...props }: ModalProps) {
  if (!props.isOpen) return null;

  const { t } = useTranslation(["partAndLabor", "partAndLaborDb", "correspondance"]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [lineTypeList, setLineTypeList] = useState<Correspondance[]>([]);
  const [typeLineOptionList, setTypeLineOptionList] = useState<OptionValue[]>([]);
  const [categoryOptionList, setCategoryOptionList] = useState<OptionValue[]>([]);
  const [subCategoryOptionList, setSubCategoryOptionList] = useState<OptionValue[]>([]);
  const [brandOptionList, setBrandOptionList] = useState<OptionValue[]>([]);
  const [filter, setFilter] = useState<PartAndLaborFilter>(partAndLaborFilterInit);
  const [partAndLaborCodeOptionList, setPartAndLaborCodeOptionList] = useState<OptionValue[]>([]);
  const [partAndLaborNameOptionList, setPartAndLaborNameOptionList] = useState<OptionValue[]>([]);

  const [invoiceLine, setInvoiceLine] = useState<InvoiceLine>(InvoiceLineInit);

  const [partAndLaborList, setPartAndLaborList] = useState<PartAndLabor[]>([]);
  const [currentPartAndLabor, setCurrentPartAndLabor] = useState<PartAndLabor>(partAndLaborInit);

  useEffect(() => {
    loadLineType(props.typeLineId);
    loadCategory();
    loadSubCategory();
    loadBrand();
    loadPartAndlabor();
    setInvoiceLine({ ...invoiceLine, invoiceId: props.invoiceId });
  }, [props.typeLineId]);

  useEffect(() => {
    filterPartAndlabor(partAndLaborList, filter);
  }, [filter]);

  //--------------------------------------------------------------------------------------------------------------------------
  const filterPartAndlabor = (_partAndlaborList: PartAndLabor[], _filter: PartAndLaborFilter) => {
    const workingPartAndLaborList: PartAndLabor[] = [..._partAndlaborList];
    const newCurrentPartAndLaborList = workingPartAndLaborList
      .filter(
        (record) =>
          _filter.typeLineCode === partAndLaborFilterInit.typeLineCode ||
          _filter.typeLineCode === t("all") ||
          record.typeLineCode === _filter.typeLineCode,
      )
      .filter(
        (record) =>
          _filter.catgoryCode === partAndLaborFilterInit.catgoryCode ||
          _filter.catgoryCode === t("all") ||
          record.categoryCode === _filter.catgoryCode,
      )
      .filter(
        (record) =>
          _filter.subCatgoryCode === partAndLaborFilterInit.subCatgoryCode ||
          _filter.subCatgoryCode === t("all") ||
          record.subCategoryCode === _filter.subCatgoryCode,
      )
      .filter(
        (record) =>
          _filter.brandCode === partAndLaborFilterInit.brandCode ||
          _filter.brandCode === t("all") ||
          record.brandCode === _filter.brandCode,
      );
    const newPartAndlaborCodeOptionList: OptionValue[] = newCurrentPartAndLaborList.map(
      (record) => ({
        value: record.id.toString(),
        label: record.code,
      }),
    );
    setPartAndLaborCodeOptionList(newPartAndlaborCodeOptionList);

    const newPartAndlaborNameOptionList: OptionValue[] = newCurrentPartAndLaborList.map(
      (record) => ({
        value: record.id.toString(),
        label: t(`partAndLaborDb:${record.code}`),
      }),
    );
    setPartAndLaborNameOptionList(newPartAndlaborNameOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadPartAndlabor = async () => {
    const _partAndlaborList: PartAndLabor[] = await getAllPartAndLabor();
    setPartAndLaborList(_partAndlaborList);
    filterPartAndlabor(_partAndlaborList, filter);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadLineType = async (_typeLine: number) => {
    const _lineTypeList: Correspondance[] = await getCorrespondanceBySubject(lineTypeSubjectCode);
    setLineTypeList(_lineTypeList);
    const newtypeLineOptionList: OptionValue[] = _lineTypeList.map((lineType) => ({
      value: lineType.valueStr,
      label: t(`correspondance:${lineType.description}`),
    }));
    setTypeLineOptionList(newtypeLineOptionList);
    setInvoiceLine({ ...invoiceLine, lineTypeCode: _typeLine });
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadCategory = async () => {
    const _categoryList: Correspondance[] =
      await getCorrespondanceBySubject(categoryTaskSubjectCode);
    const newCategoryOptionList: OptionValue[] = _categoryList.map((category) => ({
      value: category.valueStr,
      label: t(`correspondance:${category.description}`),
    }));

    setCategoryOptionList(newCategoryOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadSubCategory = async () => {
    const _subCategoryList: Correspondance[] = await getCorrespondanceBySubject(
      subCategoryTaskSubjectCode,
    );
    // setSubCategoryList(subCategoryList);
    const newSubCategoryOptionList: OptionValue[] = _subCategoryList.map((subCategory) => ({
      value: subCategory.valueStr,
      label: t(`correspondance:${subCategory.description}`),
    }));
    setSubCategoryOptionList(newSubCategoryOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadBrand = async () => {
    const _brandList: Brand[] = await getBrandList();
    // setBrandList(brandList);
    const newBrandOptionList: OptionValue[] = _brandList.map((brand) => ({
      value: brand.code,
      label: brand.name,
    }));
    setBrandOptionList(newBrandOptionList);
  };
  // --------------------------------------------------------------------------------------------------------------------------
  function codeToId(code: string): number {
    const result: Correspondance =
      lineTypeList.find((record) => record.valueStr === code) || correspondanceInit;

    return result.code;
  }
  //--------------------------------------------------------------------------------------------------------------------------

  const calculatePrice = async (partAndLabor: PartAndLabor): Promise<number> => {
    switch (partAndLabor.typeLineCode) {
      case taskTypeLine: {
        const baseSalary = (await getCorrespondanceBySubjectAndCode(baseSalarySubjectCode, 1)) || 0;
        const skillCoefficient =
          (await getCorrespondanceBySubjectAndCode(
            salaryPositionSubjectCode,
            partAndLabor.skillLevel,
          )) || 0;
        const skillReelCoefficient = Math.max(skillCoefficient.valueNum, 1);
        return (baseSalary.valueNum * skillReelCoefficient * partAndLabor.duration) / 60;
      }
      default:
        return (partAndLabor.cost * (100 + partAndLabor.margin)) / 100;
    }

    return 0;
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSave = async () => {
    setIsSubmitting(true);
    if (
      codeToId(currentPartAndLabor.typeLineCode) === 0 ||
      currentPartAndLabor.description === "" ||
      invoiceLine.quantity <= 0
    ) {
      setIsSubmitting(false);
      toast.error("typeLineCode,quantity or description empty ");
      return;
    }
    const newInvoiceLine: CreateInvoiceLineDto = {
      ...invoiceLine,
      invoiceId: props.invoiceId,
      description: currentPartAndLabor.code,
      unitPrice: await calculatePrice(currentPartAndLabor),
    };
    await addInvoiceLine(newInvoiceLine);
    props.onClose?.();
    setIsSubmitting(false);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    console.log("handleQuantityChange 247", invoiceLine);

    setInvoiceLine({
      ...invoiceLine,
      quantity: Number(event.target.value),
    });
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleDiscountRateChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setInvoiceLine({
      ...invoiceLine,
      discountRate: Number(event.target.value),
    });
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleTypeLineChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    // const typeLineCode: string = event.target.value;
    // const currentTypeLine = lineTypeList.find((lineType) => lineType.valueStr === typeLineCode);
    // setCurrentLineType(currentTypeLine || lineTypeInit);
    const newFilter: PartAndLaborFilter = { ...filter, typeLineCode: event.target.value };
    setFilter(newFilter);

    const newlineTypCode = lineTypeList.find((record) => record.valueStr === event.target.value);

    setInvoiceLine({
      ...invoiceLine,
      lineTypeCode: newlineTypCode?.code || InvoiceLineInit.lineTypeCode,
    });
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const newFilter: PartAndLaborFilter = { ...filter, catgoryCode: event.target.value };
    setFilter(newFilter);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const newFilter: PartAndLaborFilter = { ...filter, subCatgoryCode: event.target.value };
    setFilter(newFilter);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const newFilter: PartAndLaborFilter = { ...filter, brandCode: event.target.value };
    setFilter(newFilter);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handlePartAndLaborChange = (
    event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const id = Number(event.target.value);
    const newCurrentPartAndLabor = partAndLaborList.find((record) => record.id === id);
    setCurrentPartAndLabor(newCurrentPartAndLabor || partAndLaborInit);
    console.log("handlePartAndLaborChange", invoiceLine);
    setInvoiceLine({
      ...invoiceLine,
      partAndLaborId: Number(event.target.value),
      lineTypeCode: codeToId(newCurrentPartAndLabor?.typeLineCode || partAndLaborInit.typeLineCode),
    });
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{t("title")}</ModalTitle>
          <Button $variant="secondary" onClick={props.onClose}>
            ✖
          </Button>
        </ModalHeader>
        <form>
          <ModalBody>
            <FormGrid>
              <Select
                label={t("typeLine")}
                options={typeLineOptionList}
                value={filter.typeLineCode}
                onChange={handleTypeLineChange}
                placeholder={t("all")}
              />
              <Select
                label={t("category")}
                options={categoryOptionList}
                value={filter.catgoryCode}
                onChange={handleCategoryChange}
                placeholder={t("all")}
              />
              <Select
                label={t("subCategory")}
                options={subCategoryOptionList}
                value={filter.subCatgoryCode}
                onChange={handleSubCategoryChange}
                placeholder={t("all")}
              />
              <Select
                label={t("brand")}
                options={brandOptionList}
                value={filter.brandCode}
                onChange={handleBrandChange}
                placeholder={t("all")}
              />
              <Select
                label={t("partAndLaborCode")}
                options={partAndLaborCodeOptionList}
                value={currentPartAndLabor.id}
                onChange={handlePartAndLaborChange}
              />
              <Select
                label={t("partAndLaborName")}
                options={partAndLaborNameOptionList}
                value={currentPartAndLabor.id}
                onChange={handlePartAndLaborChange}
              />

              <Input
                label={t("quantity")}
                type="number"
                min={0}
                name="quantity"
                value={invoiceLine.quantity === 0 ? "" : invoiceLine.quantity}
                onChange={handleQuantityChange}
                required
              />
              <Input
                label={t("discountRate")}
                type="number"
                min={0}
                max={100}
                name="DiscountRate"
                value={invoiceLine.discountRate === 0 ? "" : invoiceLine.discountRate}
                onChange={handleDiscountRateChange}
                required
              />
            </FormGrid>
          </ModalBody>
          <ModalFooter>
            <Button type="button" $variant="primary" disabled={isSubmitting} onClick={handleSave}>
              {isSubmitting ? t("saving") : t("save")}
            </Button>
            <Button type="button" $variant="secondary" onClick={props.onClose}>
              {t("cancel")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

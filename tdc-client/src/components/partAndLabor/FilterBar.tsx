import styled from "styled-components";
import { Select } from "../UI/Select";
import type { PartAndLaborFilter } from "./types";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Correspondance } from "../correspondance/types";
import type { OptionValue } from "../../common/commun.types";
import { getCorrespondanceBySubject } from "../correspondance/crud";
import {
  categoryTaskSubjectCode,
  lineTypeSubjectCode,
  subCategoryTaskSubjectCode,
} from "../../common/constant";
import { getBrandList } from "../brand/crud";
import type { Brand } from "../brand/types";

export type FilterBarProps = {
  filterList: PartAndLaborFilter;
  setFilterList: (filter: PartAndLaborFilter) => void;
};
export default function FilterBar({ ...props }: FilterBarProps) {
  const { t } = useTranslation(["partAndLabor", "correspondance"]);
  const [lineTypeOptionList, setLineTypeOptionList] = useState<OptionValue[]>([]);
  const [categoryOptionList, setCatgoryOptionList] = useState<OptionValue[]>([]);
  const [subCatgoryOptionList, setSubCatgoryOptionList] = useState<OptionValue[]>([]);
  const [brandOptionList, setBrandOptionList] = useState<OptionValue[]>([]);

  useEffect(() => {
    loadLineType();
    loadCategory();
    loadSubCategory();
    loadBrand();
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------
  const loadLineType = async () => {
    const lineTypeList: Correspondance[] = await getCorrespondanceBySubject(lineTypeSubjectCode);
    const newlineTypeOptionList: OptionValue[] = lineTypeList.map((record) => ({
      value: record.valueStr,
      label: t(`correspondance:${record.description}`),
    }));
    setLineTypeOptionList(newlineTypeOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadCategory = async () => {
    const categoryList: Correspondance[] =
      await getCorrespondanceBySubject(categoryTaskSubjectCode);
    const newCategoryOptionList: OptionValue[] = categoryList.map((record) => ({
      value: record.valueStr,
      label: t(`correspondance:${record.description}`),
    }));
    setCatgoryOptionList(newCategoryOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadSubCategory = async () => {
    const subCategoryList: Correspondance[] = await getCorrespondanceBySubject(
      subCategoryTaskSubjectCode,
    );
    const newSubCategoryOptionList: OptionValue[] = subCategoryList.map((record) => ({
      value: record.valueStr,
      label: t(`correspondance:${record.description}`),
    }));
    setSubCatgoryOptionList(newSubCategoryOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const loadBrand = async () => {
    const brandList: Brand[] = await getBrandList();
    const newBrandOptionList: OptionValue[] = brandList.map((record) => ({
      value: record.code,
      label: record.name,
    }));
    setBrandOptionList(newBrandOptionList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnSelectLineType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setLineTypeSelected({ label: "", value: event.target.value });
    const newValue = event.target.value === t("all") ? "" : event.target.value;

    const newFilterList = {
      ...props.filterList,
      typeLineCode: newValue,
    };
    props.setFilterList(newFilterList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value === t("all") ? "" : event.target.value;
    // setCategorySelected({ label: "", value: event.target.value });
    const newFilterList = {
      ...props.filterList,
      categoryCode: newValue,
    };
    props.setFilterList(newFilterList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnSelectSubCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value === t("all") ? "" : event.target.value;
    // setSubCategorySelected({ label: "", value: event.target.value });
    const newFilterList = {
      ...props.filterList,
      subCategoryCode: newValue,
    };
    props.setFilterList(newFilterList);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnSelectBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value === t("all") ? "" : event.target.value;
    // setBrandSelected({ label: "", value: event.target.value });

    const newFilterList = {
      ...props.filterList,
      brandCode: newValue,
    };
    props.setFilterList(newFilterList);
  };

  return (
    <>
      <MainContainer>
        <Select
          value={props.filterList.typeLineCode}
          placeholder={t("all")}
          onChange={handleOnSelectLineType}
          key="lineType"
          label={t("lineType")}
          options={lineTypeOptionList}
          width="20%"
        />
        <Select
          value={props.filterList.categoryCode}
          placeholder={t("all")}
          onChange={handleOnSelectCategory}
          key="category"
          label={t("category")}
          options={categoryOptionList}
          width="20%"
        />
        <Select
          value={props.filterList.subCategoryCode}
          placeholder={t("all")}
          onChange={handleOnSelectSubCategory}
          key="subCategory"
          label={t("subCategory")}
          options={subCatgoryOptionList}
          width="20%"
        />
        <Select
          value={props.filterList.brandCode}
          placeholder={t("all")}
          onChange={handleOnSelectBrand}
          key="brand"
          label={t("brand")}
          options={brandOptionList}
          width="20%"
        />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

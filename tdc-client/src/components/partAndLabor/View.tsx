import { useMemo, useState } from "react";
import Display from "./Display";
import type { PartAndLabor, PartAndLaborFilter } from "./types";
import { allBrand, partAndLaborFilterInit } from "../../common/constant";
import FilterBar from "./FilterBar";

export type ViewProps = {
  data: PartAndLabor[];
  editMode: boolean;
  refresh?: () => void;
};
export default function View({ ...props }: ViewProps) {
  // const { t } = useTranslation(["partAndLabor"]);

  const [filterList, setFilterList] = useState<PartAndLaborFilter>(partAndLaborFilterInit);

  const filteredData = useMemo(() => {
    return props.data.filter((item) => {
      if (filterList.typeLineCode !== "" && item.typeLineCode !== filterList.typeLineCode)
        return false;
      if (filterList.categoryCode !== "" && item.categoryCode !== filterList.categoryCode)
        return false;
      if (filterList.subCategoryCode !== "" && item.subCategoryCode !== filterList.subCategoryCode)
        return false;
      filterList.brandCode !== "";
      if (
        filterList.brandCode !== "" &&
        item.brandCode !== filterList.brandCode &&
        item.brandCode !== allBrand
      )
        return false;
      return true;
    });
  }, [props.data, filterList]);

  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <FilterBar filterList={filterList} setFilterList={setFilterList} />

      {filteredData.map((record) => (
        <Display key={record.id} data={record} editMode={props.editMode} refresh={props.refresh} />
      ))}
    </>
  );
}

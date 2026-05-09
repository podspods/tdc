import { useEffect } from "react";
import { Button } from "../common/common.styled";
import { useSparePart } from "../components/sparePart/sparePart.useSparePart";
import List from "../components/sparePart/sparePart.List";

export type UseSparePartProps = {};
export default function UseSparePart({ ...props }: UseSparePartProps) {
  const {
    sparePartList,
    loading,
    stats,
    total,
    page,
    limit,
    setPage,
    setFilters,
    createSparePart,
    updateSparePart,
    deleteSparePart,
    searchSpareParts,
    refresh,
  } = useSparePart();

  useEffect(() => {
    refresh();
  }, [refresh]);

  function nothing() {}

  return (
    <>
      <h1> {sparePartList[0]?.code ? sparePartList[0].code : "init"}</h1>
      <List
        sparePartList={sparePartList}
        loading={false}
        total={sparePartList.length}
        page={1}
        limit={1}
        onDelete={nothing}
        onEdit={nothing}
        onFilterChange={nothing}
        onPageChange={nothing}
        onSearch={nothing}
        onView={nothing}
      />
      <Button>refresh</Button>
    </>
  );
}

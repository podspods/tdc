import { useEffect, useState } from "react";
import { lineTypeSubjectCode } from "../../common/constant";
import { getCorrespondanceBySubject } from "../correspondance/Crud";
import type { Correspondance } from "../correspondance/types";
import type { InvoiceLine } from "./invoice.types";
import InvoiceLineDetail from "./InvoiceLineDetail";
import { Button } from "../../common/common.styled";
import Summary from "./Summary";

export type LineSectionProps = {
  lineList: InvoiceLine[];
};
export default function LineSection({ ...props }: LineSectionProps) {
  const [lineTypeList, setLineTypeList] = useState<Correspondance[]>([]);
  const [dummy, setDummy] = useState<number>(42);

  useEffect(() => {
    loadLineType();
  }, [props.lineList, dummy]);

  const loadLineType = async () => {
    const lineTypeList: Correspondance[] = await getCorrespondanceBySubject(lineTypeSubjectCode);
    setLineTypeList(lineTypeList);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {lineTypeList.map((lineType) => (
        <InvoiceLineDetail key={lineType.id} lineType={lineType} value={props.lineList} />
      ))}
      <Summary value={props.lineList} vatRate={10} />
    </>
  );
}

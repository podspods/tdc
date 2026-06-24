import { useEffect, useState } from "react";
import { Button } from "../common/common.styled";
import type { PartAndLabor } from "../components/partAndLabor/types";
import { getAllPartAndLabor } from "../components/partAndLabor/crud";
import View from "../components/partAndLabor/View";
import { useTranslation } from "react-i18next";
import { ModalCreate } from "../components/partAndLabor/ModalCreate";

export type PartAndLaborProps = {};
export default function PartAndLabor({ ...props }: PartAndLaborProps) {
  const { t } = useTranslation(["partAndLabor"]);

  const [isModalOpen, setModalopen] = useState<boolean>(false);
  const [partAndLaborList, setPartAndLaborList] = useState<PartAndLabor[]>([]);
  const [refresh, setSefresh] = useState<number>(0);

  useEffect(() => {
    loadPartandLabor();
  }, [refresh]);

  const loadPartandLabor = async () => {
    const result = await getAllPartAndLabor();
    setPartAndLaborList(result);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleNewItem = () => {
    setModalopen(true);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleClose = () => {
    setModalopen(false);
    setSefresh((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handlerefresh = () => {
    setSefresh((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <h1>PartAndLabor</h1>
      <Button onClick={handleNewItem}>{t("new")}</Button>

      <View data={partAndLaborList} editMode={true} refresh={handlerefresh} />
      <ModalCreate isOpen={isModalOpen} onClose={handleClose} editMode />
    </>
  );
}

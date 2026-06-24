import { useEffect, useState } from "react";
import { Button, LineContainer } from "../../common/common.styled";
import { Input } from "../UI/Input";
import type { PartAndLabor } from "./types";
import { useTranslation } from "react-i18next";
import { partAndLaborInit } from "../../common/constant";
import { ModalCreate } from "./ModalCreate";

export type DisplayProps = {
  data: PartAndLabor;
  editMode: boolean;
  refresh?: () => void;
};
export default function Display({ ...props }: DisplayProps) {
  const { t } = useTranslation(["partAndLabor", "partAndLaborDb"]);
  const [isModalOpen, setModalopen] = useState<boolean>(false);
  const [partAndLabor, setPartAndLabor] = useState<PartAndLabor>(partAndLaborInit);

  useEffect(() => {
    setPartAndLabor(props.data);
  }, [props.data]);

  const handleEdit = () => {
    setModalopen(true);
  };
  const handleDelete = () => {};
  //--------------------------------------------------------------------------------------------------------------------------
  const handleClose = () => {
    props.refresh?.();
    setModalopen(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <LineContainer>
        <Input
          label={t("partAndLabor:code")}
          value={partAndLabor.code}
          width={"9rem"}
          title={partAndLabor.code}
          readOnly
        />
        <Input
          label={t("partAndLabor:name")}
          title={t(`partAndLaborDb:${partAndLabor.code}`)}
          value={t(`partAndLaborDb:${partAndLabor.code}`)}
          width={"11rem"}
          readOnly
        />
        <Input
          label={t("partAndLabor:description")}
          title={partAndLabor.description}
          value={partAndLabor.description}
          width={"10rem"}
          readOnly
        />
        {partAndLabor.typeLineCode === "TA" && (
          <>
            <Input
              label={t("partAndLabor:skillLevel")}
              value={partAndLabor.skillLevel}
              width={"5rem"}
              title={partAndLabor.skillLevel.toString()}
              readOnly
            />
            <Input
              label={t("partAndLabor:duration")}
              value={partAndLabor.duration}
              width={"5rem"}
              title={partAndLabor.duration.toString()}
              readOnly
            />
          </>
        )}
        {partAndLabor.typeLineCode !== "TA" && (
          <>
            <Input
              label={t("partAndLabor:cost")}
              value={partAndLabor.cost}
              width={"5rem"}
              title={partAndLabor.cost.toString()}
              readOnly
            />
            <Input
              label={t("partAndLabor:margin")}
              value={partAndLabor.margin}
              width={"5rem"}
              title={partAndLabor.margin.toString()}
              readOnly
            />
          </>
        )}
        {props.editMode && (
          <>
            <Button $iconOnly onClick={handleEdit} title={t("partAndLabor:edit")}>
              🖍
            </Button>
            <Button $iconOnly onClick={handleDelete} title={t("partAndLabor:delete")}>
              🗑
            </Button>
          </>
        )}
      </LineContainer>

      <ModalCreate
        partAndLabor={partAndLabor}
        isOpen={isModalOpen}
        onClose={handleClose}
        editMode
      />
    </>
  );
}

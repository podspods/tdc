import { useTranslation } from "react-i18next";
import {
  CardActions,
  CardLabel,
  CardRow,
  CardValue,
  MobileCardContainer,
} from "../../common/mobil.syled";
import { Card } from "../owner/owner.styled";
import type { Correspondance } from "./types";
import { Input } from "../UI/Input";

export type MobilProps = {
  filteredItems: Correspondance[];
  openEditModal: (correspondance: Correspondance) => void;
  handleDelete: (id: number) => void;
};
export default function Mobil({ ...props }: MobilProps) {
  const { t } = useTranslation(["correspondance"]);

  return (
    <>
      {/* Mobile card view */}
      <MobileCardContainer>
        {props.filteredItems.map((item) => (
          <Card key={item.id}>
            <CardRow>
              <Input label={t("id")} value={item.id} disabled />
              <Input label={t("subjectCode")} value={item.subjectCode} disabled />
              <Input label={t("code")} value={item.code} disabled />
            </CardRow>
            <CardRow>
              <CardLabel>{t("code")}</CardLabel>
              <CardValue>{item.code}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>{t("valueStr")}</CardLabel>
              <CardValue>{item.valueStr}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>{t("valueNum")}</CardLabel>
              <CardValue>{item.valueNum ?? "-"}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>{t("description")}</CardLabel>
              <CardValue>{item.description || "-"}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>{t("sortOrder")}</CardLabel>
              <CardValue>{item.sortOrder ?? "-"}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>{t("createdBy")}</CardLabel>
              <CardValue>{item.createdBy}</CardValue>
            </CardRow>
            <CardActions>
              <button className="btn-edit" onClick={() => props.openEditModal(item)}>
                🖍 {t("edit")}
              </button>
              <button className="btn-delete" onClick={() => props.handleDelete(item.id)}>
                🗑 {t("delete")}
              </button>
            </CardActions>
          </Card>
        ))}
      </MobileCardContainer>
    </>
  );
}

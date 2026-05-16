import { useTranslation } from "react-i18next";
import { Select } from "../../common/common.styled";
import type { Owner } from "../owner/owner.types";

export type SelectOwnerProps = {
  selectedOwnerId: number;
  setSelectedOwnerId: (id: number) => void;
  ownerList: Owner[];
};
export default function SelectOwner({ ...props }: SelectOwnerProps) {
  const { t } = useTranslation(["owner"]);

  return (
    <>
      <label>{t("owner")}</label>
      <Select
        value={props.selectedOwnerId}
        onChange={(e) => props.setSelectedOwnerId(Number(e.target.value))}
      >
        <option value={0}>{t("--selectExistingOwner--")}</option>
        {props.ownerList.map((owner) => (
          <option key={owner.id} value={owner.id}>
            {owner.firstName} {owner.lastName} ({owner.phoneNumber})
          </option>
        ))}
      </Select>
    </>
  );
}

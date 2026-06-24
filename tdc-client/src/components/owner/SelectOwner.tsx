import { useTranslation } from "react-i18next";
import type { Owner } from "../owner/types";
import { Select } from "../UI/Select";

export type SelectOwnerProps = {
  selectedOwnerId: number;
  setSelectedOwnerId: (id: number) => void;
  ownerList: Owner[];
};
export default function SelectOwner({ ...props }: SelectOwnerProps) {
  const { t } = useTranslation(["owner"]);
  return (
    <>
      <Select
        width="10rem"
        options={props.ownerList.map((owner) => ({
          value: owner.id.toString(),
          label: `${owner.firstName} ${owner.lastName} ${owner.phoneNumber}`,
        }))}
        placeholder={t("owner")}
        label={t("owner")}
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

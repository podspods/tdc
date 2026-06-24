import { Button } from "../../common/common.styled";
import { Input } from "../UI/Input";
import { type CreateOwnerDto } from "./types";
import { useTranslation } from "react-i18next";

export type NewOwnerProps = {
  owner: CreateOwnerDto;
  setOwner: (owner: CreateOwnerDto) => void;
  handleCreateOwner: () => void;
};
export default function NewOwner({ ...props }: NewOwnerProps) {
  const { t } = useTranslation(["owner"]);

  // check phone valide && not exist
  // check email valide && not exist

  return (
    <>
      <div style={{ marginTop: 10, padding: 10, border: "1px solid #ccc", display: "flex" }}>
        <Input
          label={t("firsname")}
          width="30%"
          value={props.owner.firstName}
          onChange={(e) => props.setOwner({ ...props.owner, firstName: e.target.value })}
        />
        <Input
          label={t("lastName")}
          width="30%"
          value={props.owner.lastName}
          onChange={(e) => props.setOwner({ ...props.owner, lastName: e.target.value })}
        />
        <Input
          label={t("phoneNumber")}
          width="30%"
          value={props.owner.phoneNumber}
          onChange={(e) => props.setOwner({ ...props.owner, phoneNumber: e.target.value })}
        />
        <Button onClick={props.handleCreateOwner}>{t("updateOwner")}</Button>
      </div>
    </>
  );
}

import { useTranslation } from "react-i18next";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../common/common.styled";
import { DesktopTable } from "../../common/mobil.syled";
import type { Correspondance } from "./types";

export type DesktopProps = {
  filteredItems: Correspondance[];
  openEditModal: (correspondance: Correspondance) => void;
  handleDelete: (id: number) => void;
};
export default function Desktop({ ...props }: DesktopProps) {
  const { t } = useTranslation(["correspondance"]);

  return (
    <>
      <DesktopTable>
        <Table>
          <Thead>
            <Tr>
              <Th>{t("id")}</Th>
              <Th>{t("subjectCode")}</Th>
              <Th>{t("code")}</Th>
              <Th>{t("valueStr")}</Th>
              <Th>{t("valueNum")}</Th>
              <Th>{t("description")}</Th>
              <Th>{t("sortOrder")}</Th>
              <Th>{t("createdBy")}</Th>
              <Th>{t("actions")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.filteredItems.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.subjectCode}</Td>
                <Td>{item.code}</Td>
                <Td>{item.valueStr}</Td>
                <Td>{item.valueNum}</Td>
                <Td>{item.description || "-"}</Td>
                <Td>{item.sortOrder ?? "-"}</Td>
                <Td>{item.createdBy}</Td>
                <Td style={{ display: "flex" }}>
                  <button className="btn-edit" onClick={() => props.openEditModal(item)}>
                    🖍
                  </button>
                  <button className="btn-delete" onClick={() => props.handleDelete(item.id)}>
                    🗑
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </DesktopTable>
    </>
  );
}

import { useState, useMemo } from "react";
import { _getAllCosts, _createCost, _updateCost, _deleteCost } from "./service";
import type { Cost } from "./types";
import { Button, FilterBar, SearchInput } from "../../common/common.styled";

import type { ComponentStatus } from "../../common/commun.types";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Badge from "./Badge";

export type ListProps = {
  onSelected: (cost: Cost) => void;
  onStateChange: (componentStatus: ComponentStatus) => void;
  value: Cost[];
};
export default function List({ ...props }: ListProps) {
  const { t } = useTranslation(["cost"]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  //--------------------------------------------------------------------------------------------------------------------------
  // Filter invoices based on search term
  const filteredCost = useMemo(() => {
    if (!searchTerm.trim()) return props.value;

    const lowerSearch = searchTerm.toLowerCase();
    return props.value.filter((cost: Cost) => {
      return cost.effectiveDate?.toLocaleDateString().toLowerCase().includes(lowerSearch);
    });
  }, [props.value, searchTerm]);

  //--------------------------------------------------------------------------------------------------------------------------
  const handleClearFilter = () => {
    setSearchTerm("");
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleAction = (state: ComponentStatus, cost: Cost) => {
    props.onSelected(cost);
    props.onStateChange(state);
  };

  return (
    <MainContainer>
      <h1>{t("Title")}</h1>
      <FilterBar style={{ justifyContent: "center" }}>
        <SearchInput
          type="text"
          placeholder={t("filterByNameEffectifDate")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button $variant="secondary" onClick={handleClearFilter}>
          {t("clearFilters")}
        </Button>
      </FilterBar>
      <ItemList>
        {filteredCost.map((cost) => (
          <Badge
            key={cost.id}
            value={cost}
            listMode
            onAction={handleAction}
            costList={filteredCost}
          />
        ))}
      </ItemList>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: "100%";
  display: flex;
  flex-direction: column;
`;

const ItemList = styled.div`
  width: "100%";
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

//  <Card>
//       <CardHeader>
//         <CardTitle>Cost Management</CardTitle>
//         <Button $variant="primary" onClick={handleCreate}>
//           + New Cost
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <Thead>
//             <Tr>
//               <Th>ID</Th>
//               <Th>Monthly Base</Th>
//               <Th>Day Work</Th>
//               <Th>Hour Work</Th>
//               <Th>Effective Date</Th>
//               <Th>End Date</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {costs.map((cost) => (
//               <Tr key={cost.id}>
//                 <Td>{cost.id}</Td>
//                 <Td>{cost.monthlyBase.toLocaleString()} VND</Td>
//                 <Td>{cost.dayWork.toLocaleString()} VND</Td>
//                 <Td>{cost.hourWork.toLocaleString()} VND</Td>
//                 <Td>{new Date(cost.effectiveDate).toLocaleDateString()}</Td>
//                 <Td>{cost.endDate ? new Date(cost.endDate).toLocaleDateString() : "∞"}</Td>
//                 <Td>
//                   <Button
//                     $variant="secondary"
//                     onClick={() => handleEdit(cost)}
//                     style={{ marginRight: "8px" }}
//                   >
//                     ✏️
//                   </Button>
//                   <Button $variant="danger" onClick={() => handleDelete(cost.id)}>
//                     🗑️
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </CardContent>
//       <CostModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleSubmit}
//         initialData={editingCost}
//       />
//     </Card>

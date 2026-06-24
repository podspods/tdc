import { useState, useEffect } from "react";
import { _getAllCosts, _createCost, _updateCost, _deleteCost } from "./service";
import type { Cost, CreateCostDto } from "./types";
import { CostModal } from "./CostModal";
import {
  Button,
  Table,
  Th,
  Td,
  Tr,
  Thead,
  Tbody,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../common/common.styled";

export function CostManager() {
  const [costs, setCosts] = useState<Cost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCost, setEditingCost] = useState<Cost | null>(null);

  const loadCosts = async () => {
    const res = await _getAllCosts();
    if (res.success) setCosts(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadCosts();
  }, []);

  const handleCreate = () => {
    setEditingCost(null);
    setModalOpen(true);
  };

  const handleEdit = (cost: Cost) => {
    setEditingCost(cost);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this cost record?")) {
      const res = await _deleteCost(id);
      if (res.success) await loadCosts();
      else alert(res.error);
    }
  };

  const handleSubmit = async (data: CreateCostDto) => {
    let response;
    if (editingCost) {
      response = await _updateCost(editingCost.id, data);
    } else {
      response = await _createCost(data);
    }
    if (response.success) {
      setModalOpen(false);
      await loadCosts();
    } else {
      alert(response.error);
    }
  };

  if (loading) return <div>Loading cost records...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Management</CardTitle>
        <Button $variant="primary" onClick={handleCreate}>
          + New Cost
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Monthly Base</Th>
              <Th>Day Work</Th>
              <Th>Hour Work</Th>
              <Th>Effective Date</Th>
              <Th>End Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {costs.map((cost) => (
              <Tr key={cost.id}>
                <Td>{cost.id}</Td>
                <Td>{cost.monthlyBase.toLocaleString()} VND</Td>
                <Td>{cost.dayWork.toLocaleString()} VND</Td>
                <Td>{cost.hourWork.toLocaleString()} VND</Td>
                <Td>{new Date(cost.effectiveDate).toLocaleDateString()}</Td>
                <Td>{cost.endDate ? new Date(cost.endDate).toLocaleDateString() : "∞"}</Td>
                <Td>
                  <Button
                    $variant="secondary"
                    onClick={() => handleEdit(cost)}
                    style={{ marginRight: "8px" }}
                  >
                    ✏️
                  </Button>
                  <Button $variant="danger" onClick={() => handleDelete(cost.id)}>
                    🗑️
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardContent>
      <CostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingCost}
      />
    </Card>
  );
}

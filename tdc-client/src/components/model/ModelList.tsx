// client/src/components/Model/ModelList.tsx
import { useState, useEffect } from "react";
import { _getAllModels, _deleteModel } from "./model.service";
import { type MotorcycleModel } from "./model.types";
import { Table, Th, Td, Thead, Tbody, Tr, Button } from "../../common/common.styled";

export function ModelList() {
  const [models, setModels] = useState<MotorcycleModel[]>([]);
  const [loading, setLoading] = useState(true);

  const loadModels = async () => {
    const res = await _getAllModels();
    if (res.success) setModels(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadModels();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Delete this model?")) {
      await _deleteModel(id);
      await loadModels();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Brand</Th>
          <Th>Model</Th>
          <Th>Year start</Th>
          <Th>Current</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {models.map((m) => (
          <Tr key={m.modelId}>
            <Td>{m.brandName || "-"}</Td>
            <Td>{m.modelName}</Td>
            <Td>{m.yearStart}</Td>
            <Td>{m.isCurrent ? "Yes" : "No"}</Td>
            <Td>
              <Button variant="danger" onClick={() => handleDelete(m.modelId)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

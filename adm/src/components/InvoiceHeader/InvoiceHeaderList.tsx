import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as invoiceHeaderService from "./invoiceHeader.service";
import { type InvoiceHeader, type StatsResponse } from "./invoiceHeader.types";
import {
  ActionButton,
  AddButton,
  Container,
  DefaultBadge,
  LoadingContainer,
  PageHeader,
  StatCard,
  StatLabel,
  StatsGrid,
  StatusBadge,
  StatValue,
  Table,
  Td,
  Th,
  Title,
} from "./InvoiceHeaderList.styled";

type InvoiceHeaderListProps = {
  onEdit: (header: InvoiceHeader) => void;
  onAdd: () => void;
  refreshTrigger: number;
};

export function InvoiceHeaderList({ onEdit, onAdd, refreshTrigger }: InvoiceHeaderListProps) {
  const [headers, setHeaders] = useState<InvoiceHeader[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  async function loadData() {
    setLoading(true);
    try {
      const [headersRes, statsRes] = await Promise.all([
        invoiceHeaderService.getAllInvoiceHeaders(),
        invoiceHeaderService.getInvoiceHeaderStats(),
      ]);
      console.log(headersRes);

      if (headersRes.length > 0) {
        // const headersArray = Array.isArray(headersRes.data) ? headersRes.data : [];
        setHeaders(headersRes);
        console.log(headersRes);
      } else {
        setHeaders([]);
      }
      console.log(statsRes.success);

      if (statsRes.success) {
        setStats(statsRes);
      } else {
        setStats(null);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleSetDefault(id: string) {
    try {
      const response = await invoiceHeaderService.setInvoiceHeaderAsDefault(id);
      if (response.success) {
        toast.success("Default header updated");
        loadData();
      } else {
        toast.error(response.error || "Failed to set as default");
      }
    } catch (error) {
      toast.error("Failed to set as default");
    }
  }

  async function handleToggleActive(header: InvoiceHeader) {
    try {
      const response = await invoiceHeaderService.updateInvoiceHeader(header.id, {
        isActive: !header.isActive,
      });
      if (response.success) {
        toast.success(`Header ${!header.isActive ? "activated" : "deactivated"}`);
        loadData();
      } else {
        toast.error(response.error || "Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this header?")) return;

    try {
      const response = await invoiceHeaderService.deleteInvoiceHeader(id);
      if (response.success) {
        toast.success("Header deleted successfully");
        loadData();
      } else {
        toast.error(response.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  }

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <Container>
      <PageHeader>
        <Title>Invoice Headers</Title>
        <AddButton onClick={onAdd}>+ New Header</AddButton>
      </PageHeader>
      <div>--------------[{stats?.total}]s-------------</div>
      {stats && (
        <StatsGrid>
          <StatCard>
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Total Headers</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.active}</StatValue>
            <StatLabel>Active</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.inactive}</StatValue>
            <StatLabel>Inactive</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.defaultHeader?.name || "-"}</StatValue>
            <StatLabel>Default Header</StatLabel>
          </StatCard>
        </StatsGrid>
      )}

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Company</Th>
            <Th>Phone</Th>
            <Th>Status</Th>
            <Th>Default</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header) => (
            <tr key={header.id}>
              <Td>
                <strong>{header.name}</strong>
              </Td>
              <Td>{header.companyName}</Td>
              <Td>{header.companyPhone}</Td>
              <Td>
                <StatusBadge $active={header.isActive}>
                  {header.isActive ? "Active" : "Inactive"}
                </StatusBadge>
              </Td>
              <Td>{header.isDefault && <DefaultBadge>Default</DefaultBadge>}</Td>
              <Td>
                {!header.isDefault && (
                  <ActionButton onClick={() => handleSetDefault(header.id)} title="Set as default">
                    ⭐
                  </ActionButton>
                )}
                <ActionButton onClick={() => onEdit(header)} title="Edit">
                  ✏️
                </ActionButton>
                <ActionButton
                  onClick={() => handleToggleActive(header)}
                  title={header.isActive ? "Deactivate" : "Activate"}
                >
                  {header.isActive ? "🔴" : "🟢"}
                </ActionButton>
                {!header.isDefault && (
                  <ActionButton onClick={() => handleDelete(header.id)} title="Delete">
                    🗑️
                  </ActionButton>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

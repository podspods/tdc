import { useState, useEffect } from "react";
import { useInvoice } from "../../hooks/useInvoice";
import { InvoiceForm } from "./Invoice.form";
import { InvoicePreview } from "./Invoice.preview";
import { LaborForm, PartForm, ConsumableForm, ItemsSection } from "./Invoice.items";
import {
  Container,
  Header,
  Title,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  Th,
  Td,
  Span,
} from "./Invoice.styled";
import type { LaborItem, PartItem, ConsumableItem, InvoiceStatus } from "./Invoice.types";
import { useTranslation } from "react-i18next";

type ViewMode = "list" | "create" | "edit" | "view";

export function InvoicePage() {
  const { t } = useTranslation(["invoice"]);

  const {
    invoices,
    currentInvoice,
    owners,
    vehicles,
    loading,
    loadInvoices,
    loadInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    addLaborItem,
    addPartItem,
    addConsumableItem,
    addPayment,
  } = useInvoice();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  useEffect(() => {
    if (selectedInvoiceId && (viewMode === "view" || viewMode === "edit")) {
      loadInvoice(selectedInvoiceId);
    }
  }, [selectedInvoiceId, viewMode, loadInvoice]);

  const handleCreateInvoice = async (data: any) => {
    const newInvoice = await createInvoice(data);
    if (newInvoice) {
      setSelectedInvoiceId(newInvoice.id);
      setViewMode("view");
    }
  };

  const handleUpdateStatus = async (status: InvoiceStatus) => {
    if (currentInvoice) {
      await updateInvoice(currentInvoice.id, { status });
    }
  };

  const handleDeleteInvoice = async () => {
    if (currentInvoice && confirm("deleteConfirm")) {
      await deleteInvoice(currentInvoice.id);
      setViewMode("list");
      setSelectedInvoiceId(null);
    }
  };

  const handleAddLabor = async (item: Omit<LaborItem, "id" | "amount">) => {
    if (currentInvoice) {
      await addLaborItem(currentInvoice.id, item);
    }
  };

  const handleAddPart = async (item: Omit<PartItem, "id" | "amount">) => {
    if (currentInvoice) {
      await addPartItem(currentInvoice.id, item);
    }
  };

  const handleAddConsumable = async (item: Omit<ConsumableItem, "id" | "amount">) => {
    if (currentInvoice) {
      await addConsumableItem(currentInvoice.id, item);
    }
  };

  const handleAddPayment = async () => {
    if (currentInvoice) {
      const amount = prompt("Enter payment amount:", "0");
      if (amount) {
        await addPayment(currentInvoice.id, parseFloat(amount), "cash");
      }
    }
  };

  if (loading && viewMode === "list" && invoices.length === 0) {
    return (
      <Container>
        <div style={{ textAlign: "center", padding: "40px" }}>{t("loading")}</div>
      </Container>
    );
  }

  if (viewMode === "create") {
    return (
      <Container>
        <Header>
          <Title>{t("newInvoice")}</Title>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setViewMode("list")}>
              {t("cancel")}
            </Button>
          </ButtonGroup>
        </Header>
        <Card>
          <CardContent>
            <InvoiceForm
              owners={owners}
              vehicles={vehicles}
              onSubmit={handleCreateInvoice}
              onCancel={() => setViewMode("list")}
              isLoading={loading}
            />
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (viewMode === "view" && currentInvoice) {
    return (
      <Container>
        <Header>
          <Title>
            {t("invoice")} #{currentInvoice.number}
          </Title>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setViewMode("list")}>
              {t("backToList")}
            </Button>
            <Button variant="secondary" onClick={() => setViewMode("edit")}>
              {t("edit")}
            </Button>
            <Button variant="danger" onClick={handleDeleteInvoice}>
              {t("delete")}
            </Button>
            <Button variant="success" onClick={() => handleUpdateStatus("paid")}>
              {t("markAsPaid")}
            </Button>
            <Button variant="primary" onClick={handleAddPayment}>
              {t("addPayment")}
            </Button>
          </ButtonGroup>
        </Header>

        <InvoicePreview invoice={currentInvoice} />

        {/* Items Sections */}
        <Card>
          <CardHeader>
            <CardTitle> {t("addPayment")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemsSection
              title="Labor"
              items={currentInvoice.laborItems}
              columns={[
                { key: "description", label: "Description" },
                { key: "hours", label: "Hours" },
                {
                  key: "ratePerHour",
                  label: "Rate",
                  render: (item) => `${item.ratePerHour.toLocaleString()} VND`,
                },
                {
                  key: "amount",
                  label: "Amount",
                  render: (item) => `${item.amount.toLocaleString()} VND`,
                },
              ]}
              onAdd={handleAddLabor}
              onDelete={async (id) => {
                // Implement delete
                console.log("Delete labor:", id);
              }}
              addForm={<LaborForm onSubmit={handleAddLabor} />}
            />

            <ItemsSection
              title="Parts"
              items={currentInvoice.partItems}
              columns={[
                { key: "name", label: "Part Name" },
                { key: "reference", label: "Reference" },
                { key: "quantity", label: "Qty" },
                {
                  key: "unitPrice",
                  label: "Unit Price",
                  render: (item) => `${item.unitPrice.toLocaleString()} VND`,
                },
                {
                  key: "amount",
                  label: "Amount",
                  render: (item) => `${item.amount.toLocaleString()} VND`,
                },
              ]}
              onAdd={handleAddPart}
              onDelete={async (id) => {
                // Implement delete
                console.log("Delete part:", id);
              }}
              addForm={<PartForm onSubmit={handleAddPart} />}
            />

            <ItemsSection
              title="Consumables"
              items={currentInvoice.consumableItems}
              columns={[
                { key: "name", label: "Name" },
                { key: "quantity", label: "Qty" },
                { key: "unit", label: "Unit" },
                {
                  key: "unitPrice",
                  label: "Unit Price",
                  render: (item) => `${item.unitPrice.toLocaleString()} VND`,
                },
                {
                  key: "amount",
                  label: "Amount",
                  render: (item) => `${item.amount.toLocaleString()} VND`,
                },
              ]}
              onAdd={handleAddConsumable}
              onDelete={async (id) => {
                // Implement delete
                console.log("Delete consumable:", id);
              }}
              addForm={<ConsumableForm onSubmit={handleAddConsumable} />}
            />
          </CardContent>
        </Card>
      </Container>
    );
  }

  // List view
  return (
    <Container>
      <Header>
        <Title>{t("invoice")}</Title>
        <Button variant="primary" onClick={() => setViewMode("create")}>
          + {t("newInvoice")}
        </Button>
      </Header>

      <Card>
        <CardHeader>
          <CardTitle>{t("allInvoices")}</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
              {t("noInvoice")}
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th> {t("number")}</Th>
                  <Th> {t("client")}</Th>
                  <Th> {t("date")}</Th>
                  <Th> {t("total")}</Th>
                  <Th> {t("status")}</Th>
                  <Th> {t("actions")}</Th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <Td>{invoice.number}</Td>
                    <Td>{invoice.owner.name}</Td>
                    <Td>{new Date(invoice.issueDate).toLocaleDateString()}</Td>
                    <Td>{invoice.totalAmount.toLocaleString()} VND</Td>
                    <Td>
                      <Span>{invoice.status}</Span>
                    </Td>
                    <Td>
                      <button
                        onClick={() => {
                          setSelectedInvoiceId(invoice.id);
                          setViewMode("view");
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        👁️
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

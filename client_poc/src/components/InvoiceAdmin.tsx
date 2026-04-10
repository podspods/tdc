import React, { useState, useEffect } from "react";
import { invoiceService } from "../services/invoice.service";
import { registrationService } from "../services/registration.service";
import type {
  Invoice,
  //   InvoiceLaborItem,
  //   InvoicePartItem,
  //   InvoiceConsumableItem,
  //   InvoicePayment,
  CreateInvoiceDto,
  InvoiceStatus,
} from "../types/invoice.types";
import { formatCurrency, formatDateFR } from "../common/tools";
import { ownerService } from "../services/owner.service";

interface RegistrationOption {
  registrationId: number;
  plateNumber: string;
  brandName: string;
  modelName?: string;
  ownerId: number;
  ownerName: string;
}

interface OwnerOption {
  ownerId: number;
  fullName: string;
  phoneNumber: string;
}

const InvoiceAdmin: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationOption[]>([]);
  const [owners, setOwners] = useState<OwnerOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [activeTab, setActiveTab] = useState<"labor" | "parts" | "consumables" | "payments">(
    "labor",
  );

  // Form state
  const [formData, setFormData] = useState<CreateInvoiceDto>({
    registrationId: 0,
    ownerId: 0,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    taxRate: 10,
    notes: "",
    laborItems: [],
    partsItems: [],
    consumableItems: [],
    // createBy: "admin",
  });

  // Item form states
  const [laborItem, setLaborItem] = useState({
    description: "",
    hours: 1,
    ratePerHour: 500000,
    mechanicName: "",
    notes: "",
  });

  const [partItem, setPartItem] = useState({
    partName: "",
    partReference: "",
    quantity: 1,
    unitPrice: 0,
    supplier: "",
    warrantyMonths: 0,
    notes: "",
  });

  const [consumableItem, setConsumableItem] = useState({
    consumableName: "",
    quantity: 1,
    unit: "piece",
    unitPrice: 0,
    notes: "",
  });

  const [paymentItem, setPaymentItem] = useState({
    amount: 0,
    paymentMethod: "cash",
    reference: "",
    notes: "",
    paymentDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [invoicesRes, regsRes, ownersRes] = await Promise.all([
        invoiceService.getAll({ limit: 100 }),
        registrationService.getAll({ limit: 100 }),
        ownerService.getAll({ limit: 100 }),
      ]);

      setInvoices(invoicesRes.data || []);

      // Format registrations for dropdown
      const regOptions = (regsRes.data || []).map((reg: any) => ({
        registrationId: reg.registrationId,
        plateNumber: reg.plateNumber,
        brandName: reg.brandName || "Unknown",
        modelName: reg.modelName,
        ownerId: reg.ownerId,
        ownerName: reg.ownerName || "Unknown",
      }));
      setRegistrations(regOptions);

      // Format owners for dropdown
      const ownerOptions = (ownersRes.data || []).map((owner: any) => ({
        ownerId: owner.ownerId,
        fullName: owner.fullName,
        phoneNumber: owner.phoneNumber,
      }));
      setOwners(ownerOptions);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadInvoiceDetails = async (id: number) => {
    try {
      const response = await invoiceService.getById(id);
      setSelectedInvoice(response.data || null);
    } catch (error) {
      console.error("Error loading invoice details:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "registrationId") {
      const regId = parseInt(value);
      setFormData((prev) => ({ ...prev, [name]: regId }));

      // Auto-set owner from registration
      const selectedReg = registrations.find((r) => r.registrationId === regId);
      if (selectedReg) {
        setFormData((prev) => ({ ...prev, ownerId: selectedReg.ownerId }));
      }
    } else if (name === "taxRate") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === "dueDate") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLaborItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "hours" || name === "ratePerHour") {
      setLaborItem((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setLaborItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePartItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "unitPrice" || name === "warrantyMonths") {
      setPartItem((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setPartItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConsumableItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "unitPrice") {
      setConsumableItem((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setConsumableItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setPaymentItem((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setPaymentItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await invoiceService.create(formData);
      resetForm();
      loadData();
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleAddLaborItem = async () => {
    if (!selectedInvoice) return;

    try {
      await invoiceService.addLaborItem(selectedInvoice.invoiceId, laborItem);
      loadInvoiceDetails(selectedInvoice.invoiceId);
      setLaborItem({
        description: "",
        hours: 1,
        ratePerHour: 500000,
        mechanicName: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding labor item:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleAddPartItem = async () => {
    if (!selectedInvoice) return;

    try {
      await invoiceService.addPartItem(selectedInvoice.invoiceId, partItem);
      loadInvoiceDetails(selectedInvoice.invoiceId);
      setPartItem({
        partName: "",
        partReference: "",
        quantity: 1,
        unitPrice: 0,
        supplier: "",
        warrantyMonths: 0,
        notes: "",
      });
    } catch (error) {
      console.error("Error adding part item:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleAddConsumableItem = async () => {
    if (!selectedInvoice) return;

    try {
      await invoiceService.addConsumableItem(selectedInvoice.invoiceId, consumableItem);
      loadInvoiceDetails(selectedInvoice.invoiceId);
      setConsumableItem({
        consumableName: "",
        quantity: 1,
        unit: "piece",
        unitPrice: 0,
        notes: "",
      });
    } catch (error) {
      console.error("Error adding consumable item:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleAddPayment = async () => {
    if (!selectedInvoice) return;

    try {
      await invoiceService.addPayment(selectedInvoice.invoiceId, paymentItem);
      loadInvoiceDetails(selectedInvoice.invoiceId);
      setPaymentItem({
        amount: 0,
        paymentMethod: "cash",
        reference: "",
        notes: "",
        paymentDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleDeleteItem = async (type: "labor" | "parts" | "consumables", itemId: number) => {
    if (!selectedInvoice) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      if (type === "labor") {
        await invoiceService.deleteLaborItem(itemId);
      } else if (type === "parts") {
        await invoiceService.deletePartItem(itemId);
      } else {
        await invoiceService.deleteConsumableItem(itemId);
      }
      loadInvoiceDetails(selectedInvoice.invoiceId);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleDeleteInvoice = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await invoiceService.delete(id);
      if (selectedInvoice?.invoiceId === id) {
        setSelectedInvoice(null);
      }
      loadData();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingInvoice(null);
    setFormData({
      registrationId: 0,
      ownerId: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      taxRate: 10,
      notes: "",
      laborItems: [],
      partsItems: [],
      consumableItems: [],
      //   createdBy: "admin",
    });
  };

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return "#10b981";
      case "partially_paid":
        return "#f59e0b";
      case "pending":
        return "#3b82f6";
      case "overdue":
        return "#ef4444";
      case "cancelled":
        return "#6b7280";
      case "draft":
        return "#9ca3af";
      default:
        return "#6b7280";
    }
  };

  const getStatusLabel = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "partially_paid":
        return "Partially Paid";
      case "pending":
        return "Pending";
      case "overdue":
        return "Overdue";
      case "cancelled":
        return "Cancelled";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const styles = {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "system-ui, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      color: "#2563eb",
      margin: 0,
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    buttonDanger: {
      backgroundColor: "#ef4444",
    },
    buttonSuccess: {
      backgroundColor: "#10b981",
    },
    buttonWarning: {
      backgroundColor: "#f59e0b",
    },
    form: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
    },
    select: {
      width: "100%",
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      minHeight: "80px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "#f3f4f6",
      padding: "12px",
      textAlign: "left" as const,
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #e5e7eb",
    },
    badge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "bold",
      color: "white",
    },
    tabs: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      borderBottom: "2px solid #e5e7eb",
      paddingBottom: "10px",
    },
    tab: {
      padding: "8px 16px",
      cursor: "pointer",
      border: "none",
      background: "none",
      fontSize: "1rem",
      fontWeight: 500,
    },
    activeTab: {
      color: "#2563eb",
      borderBottom: "2px solid #2563eb",
    },
    detailsPanel: {
      backgroundColor: "#f3f4f6",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "20px",
    },
    summaryCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    itemForm: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    itemList: {
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "hidden",
    },
    itemRow: {
      padding: "10px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Invoice Administration</h1>
        <button style={styles.button} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Invoice"}
        </button>
      </div>

      {/* Create Invoice Form */}
      {showForm && (
        <div style={styles.form}>
          <h3>Create New Invoice</h3>
          <form onSubmit={handleCreateInvoice}>
            <div style={styles.formGrid}>
              {/* Registration Selection */}
              <div>
                <label>Motorcycle *</label>
                <select
                  style={styles.select}
                  name="registrationId"
                  value={formData.registrationId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select motorcycle</option>
                  {registrations.map((reg) => (
                    <option key={reg.registrationId} value={reg.registrationId}>
                      {reg.plateNumber} - {reg.brandName} {reg.modelName || ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Owner (auto-filled) */}
              <div>
                <label>Owner</label>
                <select
                  style={styles.select}
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select owner</option>
                  {owners.map((owner) => (
                    <option key={owner.ownerId} value={owner.ownerId}>
                      {owner.fullName} ({owner.phoneNumber})
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label>Due Date *</label>
                <input
                  style={styles.input}
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Tax Rate */}
              <div>
                <label>Tax Rate (%)</label>
                <input
                  style={styles.input}
                  type="number"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Notes */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Notes</label>
                <textarea
                  style={styles.textarea}
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button style={styles.button} type="submit">
                Create Invoice
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#6b7280" }}
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Content */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Invoices List */}
          <div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Invoice #</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Owner</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.invoiceId}>
                    <td style={styles.td}>{inv.invoiceNumber}</td>
                    <td style={styles.td}>{formatDateFR(inv.issueDate)}</td>
                    <td style={styles.td}>{inv.owner?.fullName || "-"}</td>
                    <td style={styles.td}>{formatCurrency(inv.totalAmount)}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: getStatusColor(inv.status),
                        }}
                      >
                        {getStatusLabel(inv.status)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={{ ...styles.button, ...styles.buttonSuccess, marginRight: "5px" }}
                        onClick={() => {
                          setSelectedInvoice(inv);
                          loadInvoiceDetails(inv.invoiceId);
                        }}
                      >
                        View
                      </button>
                      <button
                        style={{ ...styles.button, ...styles.buttonDanger }}
                        onClick={() => handleDeleteInvoice(inv.invoiceId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Details */}
          {selectedInvoice && (
            <div style={styles.detailsPanel}>
              <h3>Invoice Details: {selectedInvoice.invoiceNumber}</h3>

              {/* Summary Cards */}
              <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total Amount</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
                    {formatCurrency(selectedInvoice.totalAmount)}
                  </div>
                </div>
                <div style={styles.summaryCard}>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Paid</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#10b981" }}>
                    {formatCurrency(selectedInvoice.amountPaid)}
                  </div>
                </div>
                <div style={styles.summaryCard}>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Due</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ef4444" }}>
                    {formatCurrency(selectedInvoice.amountDue)}
                  </div>
                </div>
                <div style={styles.summaryCard}>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Status</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: getStatusColor(selectedInvoice.status),
                      }}
                    >
                      {getStatusLabel(selectedInvoice.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={styles.tabs}>
                <button
                  style={{
                    ...styles.tab,
                    ...(activeTab === "labor" ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab("labor")}
                >
                  Labor ({selectedInvoice.laborItems?.length || 0})
                </button>
                <button
                  style={{
                    ...styles.tab,
                    ...(activeTab === "parts" ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab("parts")}
                >
                  Parts ({selectedInvoice.partsItems?.length || 0})
                </button>
                <button
                  style={{
                    ...styles.tab,
                    ...(activeTab === "consumables" ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab("consumables")}
                >
                  Consumables ({selectedInvoice.consumableItems?.length || 0})
                </button>
                <button
                  style={{
                    ...styles.tab,
                    ...(activeTab === "payments" ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab("payments")}
                >
                  Payments ({selectedInvoice.payments?.length || 0})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "labor" && (
                <div>
                  {/* Add Labor Item Form */}
                  <div style={styles.itemForm}>
                    <h4>Add Labor Item</h4>
                    <div style={styles.formGrid}>
                      <div>
                        <label>Description</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="description"
                          value={laborItem.description}
                          onChange={handleLaborItemChange}
                          placeholder="e.g., Oil change"
                        />
                      </div>
                      <div>
                        <label>Hours</label>
                        <input
                          style={styles.input}
                          type="number"
                          name="hours"
                          value={laborItem.hours}
                          onChange={handleLaborItemChange}
                          min="0.1"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label>Rate per hour</label>
                        <input
                          style={styles.input}
                          type="number"
                          name="ratePerHour"
                          value={laborItem.ratePerHour}
                          onChange={handleLaborItemChange}
                          min="0"
                          step="1000"
                        />
                      </div>
                      <div>
                        <label>Mechanic</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="mechanicName"
                          value={laborItem.mechanicName}
                          onChange={handleLaborItemChange}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label>Notes</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="notes"
                          value={laborItem.notes}
                          onChange={handleLaborItemChange}
                        />
                      </div>
                    </div>
                    <button
                      style={{ ...styles.button, ...styles.buttonSuccess, marginTop: "10px" }}
                      onClick={handleAddLaborItem}
                    >
                      Add Labor Item
                    </button>
                  </div>

                  {/* Labor Items List */}
                  <div style={styles.itemList}>
                    <h4>Labor Items</h4>
                    {selectedInvoice.laborItems?.map((item) => (
                      <div key={item.laborItemId} style={styles.itemRow}>
                        <div>
                          <strong>{item.description}</strong>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {item.hours} hrs × {formatCurrency(item.ratePerHour)}/hr
                            {item.mechanicName && ` - ${item.mechanicName}`}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <strong>{formatCurrency(item.amount || 0)}</strong>
                          <button
                            style={{ ...styles.button, ...styles.buttonDanger, padding: "4px 8px" }}
                            onClick={() => handleDeleteItem("labor", item.laborItemId!)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "parts" && (
                <div>
                  {/* Add Part Item Form */}
                  <div style={styles.itemForm}>
                    <h4>Add Part Item</h4>
                    <div style={styles.formGrid}>
                      <div>
                        <label>Part Name</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="partName"
                          value={partItem.partName}
                          onChange={handlePartItemChange}
                          placeholder="e.g., Brake pads"
                        />
                      </div>
                      <div>
                        <label>Reference</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="partReference"
                          value={partItem.partReference}
                          onChange={handlePartItemChange}
                        />
                      </div>
                      <div>
                        <label>Quantity</label>
                        <input
                          style={styles.input}
                          type="number"
                          name="quantity"
                          value={partItem.quantity}
                          onChange={handlePartItemChange}
                          min="1"
                        />
                      </div>
                      <div>
                        <label>Unit Price</label>
                        <input
                          style={styles.input}
                          type="number"
                          name="unitPrice"
                          value={partItem.unitPrice}
                          onChange={handlePartItemChange}
                          min="0"
                          step="1000"
                        />
                      </div>
                      <div>
                        <label>Supplier</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="supplier"
                          value={partItem.supplier}
                          onChange={handlePartItemChange}
                        />
                      </div>
                      <div>
                        <label>Warranty (months)</label>
                        <input
                          style={styles.input}
                          type="number"
                          name="warrantyMonths"
                          value={partItem.warrantyMonths}
                          onChange={handlePartItemChange}
                          min="0"
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label>Notes</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="notes"
                          value={partItem.notes}
                          onChange={handlePartItemChange}
                        />
                      </div>
                    </div>
                    <button
                      style={{ ...styles.button, ...styles.buttonSuccess, marginTop: "10px" }}
                      onClick={handleAddPartItem}
                    >
                      Add Part Item
                    </button>
                  </div>

                  {/* Parts Items List */}
                  <div style={styles.itemList}>
                    <h4>Parts Items</h4>
                    {selectedInvoice.partsItems?.map((item) => (
                      <div key={item.partsItemId} style={styles.itemRow}>
                        <div>
                          <strong>{item.partName}</strong>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {item.quantity} × {formatCurrency(item.unitPrice)}
                            {item.partReference && ` - Ref: ${item.partReference}`}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <strong>{formatCurrency(item.amount || 0)}</strong>
                          <button
                            style={{ ...styles.button, ...styles.buttonDanger, padding: "4px 8px" }}
                            onClick={() => handleDeleteItem("parts", item.partsItemId!)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "consumables" && (
                <div>
                  {/* Add Consumable Item Form */}
                  <div style={styles.itemForm}>
                    <h4>Add Consumable Item</h4>
                    <div style={styles.formGrid}>
                      <div>
                        <label>Consumable Name</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="consumableName"
                          value={consumableItem.consumableName}
                          onChange={handleConsumableItemChange}
                          placeholder="e.g., Engine oil"
                        />
                      </div>
                      <div>
                        <label>Quantity</label>
                        <input
                          style={styles.input}
                          type="number"
                          name="quantity"
                          value={consumableItem.quantity}
                          onChange={handleConsumableItemChange}
                          min="0.1"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label>Unit</label>
                        <select
                          style={styles.select}
                          name="unit"
                          value={consumableItem.unit}
                          onChange={handleConsumableItemChange}
                        >
                          <option value="piece">piece</option>
                          <option value="liter">liter</option>
                          <option value="kg">kg</option>
                          <option value="ml">ml</option>
                          <option value="box">box</option>
                        </select>
                      </div>
                      <div>
                        <label>Unit Price</label>
                        <input
                          style={styles.input}
                          type="number"
                          name="unitPrice"
                          value={consumableItem.unitPrice}
                          onChange={handleConsumableItemChange}
                          min="0"
                          step="1000"
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label>Notes</label>
                        <input
                          style={styles.input}
                          type="text"
                          name="notes"
                          value={consumableItem.notes}
                          onChange={handleConsumableItemChange}
                        />
                      </div>
                    </div>
                    <button
                      style={{ ...styles.button, ...styles.buttonSuccess, marginTop: "10px" }}
                      onClick={handleAddConsumableItem}
                    >
                      Add Consumable Item
                    </button>
                  </div>

                  {/* Consumable Items List */}
                  <div style={styles.itemList}>
                    <h4>Consumable Items</h4>
                    {selectedInvoice.consumableItems?.map((item) => (
                      <div key={item.consumableItemId} style={styles.itemRow}>
                        <div>
                          <strong>{item.consumableName}</strong>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <strong>{formatCurrency(item.amount || 0)}</strong>
                          <button
                            style={{ ...styles.button, ...styles.buttonDanger, padding: "4px 8px" }}
                            onClick={() => handleDeleteItem("consumables", item.consumableItemId!)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "payments" && (
                <div>
                  {/* Add Payment Form */}
                  {selectedInvoice.amountDue > 0 && selectedInvoice.status !== "paid" && (
                    <div style={styles.itemForm}>
                      <h4>Add Payment</h4>
                      <div style={styles.formGrid}>
                        <div>
                          <label>Amount</label>
                          <input
                            style={styles.input}
                            type="number"
                            name="amount"
                            value={paymentItem.amount}
                            onChange={handlePaymentChange}
                            min="0"
                            max={selectedInvoice.amountDue}
                            step="1000"
                          />
                        </div>
                        <div>
                          <label>Payment Method</label>
                          <select
                            style={styles.select}
                            name="paymentMethod"
                            value={paymentItem.paymentMethod}
                            onChange={handlePaymentChange}
                          >
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="e_wallet">E-Wallet</option>
                          </select>
                        </div>
                        <div>
                          <label>Reference</label>
                          <input
                            style={styles.input}
                            type="text"
                            name="reference"
                            value={paymentItem.reference}
                            onChange={handlePaymentChange}
                          />
                        </div>
                        <div>
                          <label>Payment Date</label>
                          <input
                            style={styles.input}
                            type="date"
                            name="paymentDate"
                            value={paymentItem.paymentDate}
                            onChange={handlePaymentChange}
                          />
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                          <label>Notes</label>
                          <input
                            style={styles.input}
                            type="text"
                            name="notes"
                            value={paymentItem.notes}
                            onChange={handlePaymentChange}
                          />
                        </div>
                      </div>
                      <button
                        style={{ ...styles.button, ...styles.buttonSuccess, marginTop: "10px" }}
                        onClick={handleAddPayment}
                      >
                        Add Payment
                      </button>
                    </div>
                  )}

                  {/* Payments List */}
                  <div style={styles.itemList}>
                    <h4>Payment History</h4>
                    {selectedInvoice.payments?.map((payment) => (
                      <div key={payment.paymentId} style={styles.itemRow}>
                        <div>
                          <strong>{formatDateFR(payment.paymentDate)}</strong>
                          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                            {payment.paymentMethod}
                            {payment.reference && ` - Ref: ${payment.reference}`}
                          </div>
                        </div>
                        <div>
                          <strong>{formatCurrency(payment.amount)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceAdmin;

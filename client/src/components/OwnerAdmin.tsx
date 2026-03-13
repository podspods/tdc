import React, { useState, useEffect } from "react";
// import  { ownerService } from "../services/owner.service";
import type { CreateOwnerDto, Owner, OwnerCategory } from "../types/owner.types";
import { formatDateFR } from "../commun/tools";
import { ownerService } from "../services/owner.service";

const OwnerAdmin: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [ownerDetails, setOwnerDetails] = useState<any>(null);

  const [formData, setFormData] = useState<CreateOwnerDto>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    category: "basic",
    notes: "",
  });

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    setLoading(true);
    try {
      const response = await ownerService.getAll({ limit: 100 });
      setOwners(response.data || []);
    } catch (error) {
      console.error("Error loading owners:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadOwnerDetails = async (id: number) => {
    try {
      const response = await ownerService.getWithDetails(id);
      setOwnerDetails(response.data);
    } catch (error) {
      console.error("Error loading owner details:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOwner) {
        await ownerService.update(editingOwner.ownerId, formData);
      } else {
        await ownerService.create(formData);
      }
      resetForm();
      loadOwners();
    } catch (error) {
      console.error("Error saving owner:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleEdit = (owner: Owner) => {
    setEditingOwner(owner);
    setFormData({
      firstName: owner.firstName,
      lastName: owner.lastName,
      phoneNumber: owner.phoneNumber,
      email: owner.email || "",
      address: owner.address || "",
      city: owner.city || "",
      category: owner.category,
      notes: owner.notes || "",
    });
    setShowForm(true);
  };

  const handleViewDetails = (owner: Owner) => {
    setSelectedOwner(owner);
    loadOwnerDetails(owner.ownerId);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;
    try {
      await ownerService.delete(id);
      loadOwners();
    } catch (error) {
      console.error("Error deleting owner:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingOwner(null);
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      category: "basic",
      notes: "",
    });
  };

  const getCategoryColor = (category: OwnerCategory) => {
    switch (category) {
      case "vip":
        return "#fbbf24";
      case "important":
        return "#10b981";
      case "basic":
        return "#6b7280";
      default:
        return "#6b7280";
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
    buttonEdit: {
      backgroundColor: "#10b981",
      marginRight: "5px",
    },
    buttonView: {
      backgroundColor: "#8b5cf6",
      marginRight: "5px",
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
    detailsPanel: {
      backgroundColor: "#f3f4f6",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    detailsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Owners Administration</h1>
        <button style={styles.button} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Owner"}
        </button>
      </div>

      {/* Details Panel */}
      {selectedOwner && ownerDetails && (
        <div style={styles.detailsPanel}>
          <h3 style={{ marginTop: 0 }}>Owner Details: {selectedOwner.fullName}</h3>
          <div style={styles.detailsGrid}>
            {/* Info Card */}
            <div style={styles.card}>
              <h4>Information</h4>
              <p>
                <strong>Phone:</strong> {ownerDetails.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {ownerDetails.email || "-"}
              </p>
              <p>
                <strong>Address:</strong> {ownerDetails.address || "-"}
              </p>
              <p>
                <strong>City:</strong> {ownerDetails.city || "-"}
              </p>
              <p>
                <strong>Category:</strong>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: getCategoryColor(ownerDetails.category),
                    marginLeft: "8px",
                  }}
                >
                  {ownerDetails.category}
                </span>
              </p>
            </div>

            {/* Stats Card */}
            <div style={styles.card}>
              <h4>Statistics</h4>
              <p>
                <strong>Motorcycles:</strong> {ownerDetails.totalMotorcycles}
              </p>
              <p>
                <strong>Total Invoices:</strong> {ownerDetails.totalInvoices}
              </p>
              <p>
                <strong>Outstanding:</strong> {ownerDetails.outstandingInvoices}
              </p>
              <p>
                <strong>Total Paid:</strong>{" "}
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  ownerDetails.totalPaid,
                )}
              </p>
              <p>
                <strong>Total Spent:</strong>{" "}
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  ownerDetails.totalSpent,
                )}
              </p>
            </div>

            {/* Motorcycles Card */}
            <div style={styles.card}>
              <h4>Motorcycles ({ownerDetails.motorcycles.length})</h4>
              {ownerDetails.motorcycles.map((moto: any) => (
                <div
                  key={moto.registrationId}
                  style={{
                    marginBottom: "10px",
                    padding: "5px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <strong>{moto.plateNumber}</strong>
                  </div>
                  <div>
                    {moto.brandName} {moto.modelName}
                  </div>
                  <div>Color: {moto.color || "-"}</div>
                </div>
              ))}
            </div>

            {/* Invoices Card */}
            <div style={styles.card}>
              <h4>Recent Invoices</h4>
              {ownerDetails.invoices.slice(0, 5).map((inv: any) => (
                <div
                  key={inv.invoiceId}
                  style={{
                    marginBottom: "10px",
                    padding: "5px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <strong>{inv.invoiceNumber}</strong>
                  </div>
                  <div>Date: {formatDateFR(inv.issueDate)}</div>
                  <div>Status: {inv.status}</div>
                  <div>
                    Amount:{" "}
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      inv.totalAmount,
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            style={{ ...styles.button, marginTop: "10px" }}
            onClick={() => setSelectedOwner(null)}
          >
            Close Details
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={styles.form}>
          <h3>{editingOwner ? "Edit Owner" : "New Owner"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              {/* First Name */}
              <div>
                <label>First Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label>Last Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone Number - Unique */}
              <div>
                <label>Phone Number *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="0901234567"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}
              <div>
                <label>Category</label>
                <select
                  style={styles.select}
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="basic">Basic</option>
                  <option value="important">Important</option>
                  <option value="vip">VIP</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label>City</label>
                <input
                  style={styles.input}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              {/* Address - full width */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Address</label>
                <input
                  style={styles.input}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              {/* Notes - full width */}
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
                {editingOwner ? "Update" : "Create"}
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

      {/* Owners Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Motorcycles</th>
              <th style={styles.th}>Invoices</th>
              <th style={styles.th}>Total Spent</th>
              <th style={styles.th}>Last Visit</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.ownerId}>
                <td style={styles.td}>{owner.ownerId}</td>
                <td style={styles.td}>{owner.fullName}</td>
                <td style={styles.td}>{owner.phoneNumber}</td>
                <td style={styles.td}>{owner.email || "-"}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: getCategoryColor(owner.category),
                    }}
                  >
                    {owner.category}
                  </span>
                </td>
                <td style={styles.td}>{owner.city || "-"}</td>
                <td style={styles.td}>{owner.totalMotorcycles}</td>
                <td style={styles.td}>{owner.totalInvoices}</td>
                <td style={styles.td}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    owner.totalSpent,
                  )}
                </td>
                <td style={styles.td}>
                  {owner.lastVisitDate ? formatDateFR(owner.lastVisitDate) : "-"}
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.buttonView }}
                    onClick={() => handleViewDetails(owner)}
                  >
                    View
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonEdit }}
                    onClick={() => handleEdit(owner)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonDanger }}
                    onClick={() => handleDelete(owner.ownerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerAdmin;

import React, { useState, useEffect } from "react";
import { laborService } from "../services/labor.service";
import type { Labor, LaborCategory, SkillLevel, CreateLaborDto } from "../types/labor.types";
import { formatCurrency } from "../common/tools";

interface LaborEditProps {
  laborId?: number; // Optional: if provided, edit mode, else create mode
  onClose?: () => void;
  onSave?: () => void;
}

const LaborEdit: React.FC<LaborEditProps> = ({ laborId, onClose, onSave }) => {
  // State for form data
  const [formData, setFormData] = useState<CreateLaborDto>({
    laborCode: "",
    laborName: "",
    description: "",
    category: undefined,
    defaultRatePerHour: 0,
    estimatedHours: undefined,
    minCharge: undefined,
    requiredSkillLevel: undefined,
    requiredCertification: "",
    createdBy: "admin",
  });

  // State for UI
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [laborList, setLaborList] = useState<Labor[]>([]);
  const [selectedLabor, setSelectedLabor] = useState<Labor | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Load labor list on mount
  useEffect(() => {
    loadLaborList();
  }, []);

  // Load specific labor if laborId provided
  useEffect(() => {
    if (laborId) {
      loadLaborById(laborId);
    }
  }, [laborId]);

  const loadLaborList = async () => {
    setLoading(true);
    try {
      const response = await laborService.getAll({ limit: 100 });
      setLaborList(response.data || []);
    } catch (err) {
      setError("Failed to load labor items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadLaborById = async (id: number) => {
    setLoading(true);
    try {
      const response = await laborService.getById(id);
      const labor = response.data;
      if (labor) {
        setSelectedLabor(labor);
        setFormData({
          laborCode: labor.laborCode,
          laborName: labor.laborName,
          description: labor.description || "",
          category: labor.category,
          defaultRatePerHour: labor.defaultRatePerHour,
          estimatedHours: labor.estimatedHours,
          minCharge: labor.minCharge,
          requiredSkillLevel: labor.requiredSkillLevel,
          requiredCertification: labor.requiredCertification || "",
          createdBy: "admin",
        });
        setIsEditing(true);
        setShowForm(true);
      }
    } catch (err) {
      setError("Failed to load labor details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Handle numeric fields
    if (name === "defaultRatePerHour" || name === "estimatedHours" || name === "minCharge") {
      setFormData((prev) => ({ ...prev, [name]: value ? parseFloat(value) : undefined }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && selectedLabor) {
        // Update existing labor
        await laborService.update(selectedLabor.laborId, formData);
        setSuccess("Labor item updated successfully");
      } else {
        // Create new labor
        await laborService.create(formData);
        setSuccess("Labor item created successfully");
        resetForm();
      }
      loadLaborList();
      if (onSave) onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save labor item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await laborService.delete(id);
      setSuccess("Labor item deleted successfully");
      loadLaborList();
      if (selectedLabor?.laborId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete labor item");
    } finally {
      setLoading(false);
      setDeleteConfirm(null);
    }
  };

  const handleEdit = (labor: Labor) => {
    setSelectedLabor(labor);
    setFormData({
      laborCode: labor.laborCode,
      laborName: labor.laborName,
      description: labor.description || "",
      category: labor.category,
      defaultRatePerHour: labor.defaultRatePerHour,
      estimatedHours: labor.estimatedHours,
      minCharge: labor.minCharge,
      requiredSkillLevel: labor.requiredSkillLevel,
      requiredCertification: labor.requiredCertification || "",
      createdBy: "admin",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      laborCode: "",
      laborName: "",
      description: "",
      category: undefined,
      defaultRatePerHour: 0,
      estimatedHours: undefined,
      minCharge: undefined,
      requiredSkillLevel: undefined,
      requiredCertification: "",
      createdBy: "admin",
    });
    setIsEditing(false);
    setSelectedLabor(null);
    setShowForm(false);
    setError(null);
    setSuccess(null);
  };

  const getCategoryLabel = (category?: LaborCategory): string => {
    switch (category) {
      case "maintenance":
        return "🔧 Maintenance";
      case "repair":
        return "⚙️ Repair";
      case "diagnostic":
        return "🔍 Diagnostic";
      case "customization":
        return "🎨 Customization";
      default:
        return "Other";
    }
  };

  const getSkillLevelLabel = (level?: SkillLevel): string => {
    switch (level) {
      case "basic":
        return "Basic";
      case "intermediate":
        return "Intermediate";
      case "advanced":
        return "Advanced";
      case "expert":
        return "Expert";
      default:
        return "Not specified";
    }
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
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
      transition: "background-color 0.2s",
    },
    buttonSuccess: {
      backgroundColor: "#10b981",
    },
    buttonDanger: {
      backgroundColor: "#ef4444",
    },
    buttonWarning: {
      backgroundColor: "#f59e0b",
    },
    buttonSmall: {
      padding: "5px 10px",
      fontSize: "12px",
      marginRight: "5px",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
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
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "500",
      fontSize: "14px",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
      transition: "border-color 0.2s",
    },
    select: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
      backgroundColor: "white",
    },
    textarea: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "5px",
      fontSize: "14px",
      minHeight: "80px",
      resize: "vertical" as const,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#f3f4f6",
      padding: "12px",
      textAlign: "left" as const,
      fontWeight: "600",
      fontSize: "14px",
      borderBottom: "2px solid #e5e7eb",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #e5e7eb",
      fontSize: "14px",
    },
    trEven: {
      backgroundColor: "#f9fafb",
    },
    trHover: {
      transition: "background-color 0.2s",
      cursor: "pointer",
    },
    badge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: "500",
      backgroundColor: "#e5e7eb",
      color: "#374151",
    },
    badgeActive: {
      backgroundColor: "#10b981",
      color: "white",
    },
    badgeInactive: {
      backgroundColor: "#ef4444",
      color: "white",
    },
    alert: {
      padding: "12px",
      borderRadius: "5px",
      marginBottom: "20px",
    },
    alertSuccess: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
      border: "1px solid #10b981",
    },
    alertError: {
      backgroundColor: "#fee2e2",
      color: "#ef4444",
      border: "1px solid #ef4444",
    },
    loading: {
      textAlign: "center" as const,
      padding: "40px",
      color: "#6b7280",
    },
    deleteConfirm: {
      backgroundColor: "#fee2e2",
      padding: "10px",
      borderRadius: "5px",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Labor Catalog Management</h1>
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, ...styles.buttonSuccess }}
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + New Labor Item
          </button>
          {onClose && (
            <button style={{ ...styles.button, backgroundColor: "#6b7280" }} onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div style={{ ...styles.alert, ...styles.alertError }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div style={{ ...styles.alert, ...styles.alertSuccess }}>
          <strong>Success:</strong> {success}
        </div>
      )}

      {/* Create/Edit Form */}
      {showForm && (
        <div style={styles.form}>
          <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#2563eb" }}>
            {isEditing ? "✏️ Edit Labor Item" : "➕ New Labor Item"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              {/* Labor Code */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Labor Code *</label>
                <input
                  type="text"
                  name="laborCode"
                  value={formData.laborCode}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., LAB001"
                  required
                  disabled={isEditing} // Can't change code when editing
                />
              </div>

              {/* Labor Name */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Labor Name *</label>
                <input
                  type="text"
                  name="laborName"
                  value={formData.laborName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., Oil Change"
                  required
                />
              </div>

              {/* Category */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <select
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  style={styles.select}
                >
                  <option value="">Select category</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="repair">Repair</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="customization">Customization</option>
                </select>
              </div>

              {/* Default Rate Per Hour */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Rate per Hour (VND) *</label>
                <input
                  type="number"
                  name="defaultRatePerHour"
                  value={formData.defaultRatePerHour}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 350000"
                  min="0"
                  step="1000"
                  required
                />
              </div>

              {/* Estimated Hours */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Estimated Hours</label>
                <input
                  type="number"
                  name="estimatedHours"
                  value={formData.estimatedHours || ""}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 1.5"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Minimum Charge */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Minimum Charge (VND)</label>
                <input
                  type="number"
                  name="minCharge"
                  value={formData.minCharge || ""}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 200000"
                  min="0"
                  step="1000"
                />
              </div>

              {/* Required Skill Level */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Required Skill Level</label>
                <select
                  name="requiredSkillLevel"
                  value={formData.requiredSkillLevel || ""}
                  onChange={handleInputChange}
                  style={styles.select}
                >
                  <option value="">Select skill level</option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Required Certification */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Required Certification</label>
                <input
                  type="text"
                  name="requiredCertification"
                  value={formData.requiredCertification}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., Master Technician"
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Detailed description of the labor service..."
              />
            </div>

            {/* Form Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="submit"
                style={{ ...styles.button, ...styles.buttonSuccess }}
                disabled={loading}
              >
                {loading ? "Saving..." : isEditing ? "Update Labor Item" : "Create Labor Item"}
              </button>
              <button
                type="button"
                style={{ ...styles.button, backgroundColor: "#6b7280" }}
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Labor List Table */}
      {loading && !showForm ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Rate/Hour</th>
                <th style={styles.th}>Est. Hours</th>
                <th style={styles.th}>Min Charge</th>
                <th style={styles.th}>Skill Level</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {laborList.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}
                  >
                    No labor items found. Create your first one!
                  </td>
                </tr>
              ) : (
                laborList.map((labor, index) => (
                  <React.Fragment key={labor.laborId}>
                    <tr
                      style={{
                        ...(index % 2 === 0 ? styles.trEven : {}),
                        ...styles.trHover,
                      }}
                    >
                      <td style={styles.td}>
                        <span style={styles.badge}>{labor.laborCode}</span>
                      </td>
                      <td style={{ ...styles.td, fontWeight: "bold" }}>{labor.laborName}</td>
                      <td style={styles.td}>{getCategoryLabel(labor.category)}</td>
                      <td style={styles.td}>{formatCurrency(labor.defaultRatePerHour)}</td>
                      <td style={styles.td}>
                        {labor.estimatedHours ? `${labor.estimatedHours}h` : "-"}
                      </td>
                      <td style={styles.td}>
                        {labor.minCharge ? formatCurrency(labor.minCharge) : "-"}
                      </td>
                      <td style={styles.td}>{getSkillLevelLabel(labor.requiredSkillLevel)}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            ...(labor.isActive ? styles.badgeActive : styles.badgeInactive),
                          }}
                        >
                          {labor.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={{
                            ...styles.button,
                            ...styles.buttonSmall,
                            ...styles.buttonWarning,
                          }}
                          onClick={() => handleEdit(labor)}
                        >
                          Edit
                        </button>

                        {deleteConfirm === labor.laborId ? (
                          <div style={styles.deleteConfirm}>
                            <span style={{ marginRight: "10px" }}>Confirm?</span>
                            <button
                              style={{
                                ...styles.button,
                                ...styles.buttonSmall,
                                ...styles.buttonDanger,
                                marginRight: "5px",
                              }}
                              onClick={() => handleDelete(labor.laborId)}
                            >
                              Yes
                            </button>
                            <button
                              style={{
                                ...styles.button,
                                ...styles.buttonSmall,
                                backgroundColor: "#6b7280",
                              }}
                              onClick={() => setDeleteConfirm(null)}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            style={{
                              ...styles.button,
                              ...styles.buttonSmall,
                              ...styles.buttonDanger,
                            }}
                            onClick={() => setDeleteConfirm(labor.laborId)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Loading indicator for background operations */}
      {loading && showForm && <div style={styles.loading}>Processing...</div>}
    </div>
  );
};

export default LaborEdit;

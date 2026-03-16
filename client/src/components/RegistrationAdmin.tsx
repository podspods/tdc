import React, { useState, useEffect } from "react";
import { registrationService } from "../services/registration.service";
import { motorcycleBrandService } from "../services/motorcycleBrand.service";
import { motorcycleModelService } from "../services/motorcycleModel.service";
import type { MotorcycleModel } from "../types/motorcycleModel.types";
import type { CreateRegistrationDto, Registration } from "../types/registration.types";
import { formatDateFR } from "../common/tools";

interface BrandOption {
  brandId: number;
  brandName: string;
}

const RegistrationAdmin: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const [models, setModels] = useState<MotorcycleModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingReg, setEditingReg] = useState<Registration | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<number>(0);

  const [formData, setFormData] = useState<CreateRegistrationDto>({
    plateNumber: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    color: "",
    brandId: 0,
    modelId: null,
    createdBy: "admin",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedBrandId) {
      loadModelsByBrand(selectedBrandId);
    } else {
      setModels([]);
    }
  }, [selectedBrandId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [regsRes, brandsRes] = await Promise.all([
        registrationService.getAll({ limit: 100 }),
        motorcycleBrandService.getAllOptions(),
      ]);
      setRegistrations(regsRes.data || []);
      setBrands(brandsRes);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadModelsByBrand = async (brandId: number) => {
    try {
      const response = await motorcycleModelService.getByBrand(brandId);
      setModels(response.data || []);
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "brandId") {
      const brandId = parseInt(value);
      setSelectedBrandId(brandId);
      setFormData((prev) => ({
        ...prev,
        brandId,
        modelId: null, // Reset model when brand changes
      }));
    } else if (name === "modelId") {
      setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReg) {
        await registrationService.update(editingReg.registrationId, formData);
      } else {
        await registrationService.create(formData);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error("Error saving registration:", error);
      alert("Error: " + (error as Error).message);
    }
  };

  const handleEdit = (reg: Registration) => {
    setEditingReg(reg);
    setSelectedBrandId(reg.brandId);
    setFormData({
      plateNumber: reg.plateNumber,
      ownerName: reg.ownerName,
      ownerPhone: reg.ownerPhone || "",
      ownerEmail: reg.ownerEmail || "",
      color: reg.color || "",
      brandId: reg.brandId,
      modelId: reg.modelId,
      createdBy: "admin",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) return;
    try {
      await registrationService.delete(id);
      loadData();
    } catch (error) {
      console.error("Error deleting registration:", error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingReg(null);
    setSelectedBrandId(0);
    setFormData({
      plateNumber: "",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      color: "",
      brandId: 0,
      modelId: null,
      createdBy: "admin",
    });
  };

  const styles = {
    container: {
      maxWidth: "1200px",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Registration Administration</h1>
        <button style={styles.button} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Registration"}
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>{editingReg ? "Edit Registration" : "New Registration"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              {/* Plate Number - Unique key */}
              <div>
                <label>Plate Number *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleInputChange}
                  placeholder="59A1-12345"
                  required
                />
              </div>

              {/* Owner Name */}
              <div>
                <label>Owner Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Owner Phone */}
              <div>
                <label>Phone</label>
                <input
                  style={styles.input}
                  type="text"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleInputChange}
                  placeholder="0901234567"
                />
              </div>

              {/* Owner Email */}
              <div>
                <label>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                />
              </div>

              {/* Color */}
              <div>
                <label>Color</label>
                <input
                  style={styles.input}
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Red, Blue, Black..."
                />
              </div>

              {/* Brand */}
              <div>
                <label>Brand *</label>
                <select
                  style={styles.select}
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand.brandId} value={brand.brandId}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model */}
              {selectedBrandId > 0 && (
                <div>
                  <label>Model</label>
                  <select
                    style={styles.select}
                    name="modelId"
                    value={formData.modelId || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a model (optional)</option>
                    {models.map((model) => (
                      <option key={model.modelId} value={model.modelId}>
                        {model.modelName} ({model.yearStart})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button style={styles.button} type="submit">
                {editingReg ? "Update" : "Create"}
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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Plate</th>
              <th style={styles.th}>Owner</th>
              <th style={styles.th}>Brand</th>
              <th style={styles.th}>Model</th>
              <th style={styles.th}>Color</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Created</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.registrationId}>
                <td style={styles.td}>
                  <strong>{reg.plateNumber}</strong>
                </td>
                <td style={styles.td}>{reg.ownerName}</td>
                <td style={styles.td}>{reg.brandName}</td>
                <td style={styles.td}>{reg.modelName || "-"}</td>
                <td style={styles.td}>{reg.color || "-"}</td>
                <td style={styles.td}>
                  {reg.ownerPhone && <div>{reg.ownerPhone}</div>}
                  {reg.ownerEmail && <div>{reg.ownerEmail}</div>}
                </td>
                <td style={styles.td}>{formatDateFR(reg.createdAt)}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.buttonEdit }}
                    onClick={() => handleEdit(reg)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonDanger }}
                    onClick={() => handleDelete(reg.registrationId)}
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

export default RegistrationAdmin;

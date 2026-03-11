import React, { useState, useEffect } from "react";
import { motorcycleModelService } from "../services/motorcycleModel.service";
import { motorcycleBrandService } from "../services/motorcycleBrand.service";
import type { CreateMotorcycleModelDto, MotorcycleModel } from "../types/motorcycleModel.types";
import type { BrandOption } from "../types/motorcycleBrand.types";

const MotorcycleModelAdmin: React.FC = () => {
  const [models, setModels] = useState<MotorcycleModel[]>([]);
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingModel, setEditingModel] = useState<MotorcycleModel | null>(null);
  const [formData, setFormData] = useState<CreateMotorcycleModelDto>({
    brandId: 0,
    modelName: "",
    yearStart: new Date().getFullYear(),
    yearEnd: null,
    isCurrent: true,
    engineDisplacement: undefined,
    engineType: "",
    powerHp: undefined,
    description: "",
    createdBy: "admin",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [modelsRes, brandsRes] = await Promise.all([
        motorcycleModelService.getAll({ limit: 100 }),
        motorcycleBrandService.getAllOptions(),
      ]);
      setModels(modelsRes.data || []);
      setBrands(brandsRes);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (
      name === "brandId" ||
      name === "yearStart" ||
      name === "engineDisplacement" ||
      name === "powerHp"
    ) {
      setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) : undefined }));
    } else if (name === "yearEnd") {
      setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingModel) {
        await motorcycleModelService.update(editingModel.modelId, formData);
      } else {
        await motorcycleModelService.create(formData);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error("Error saving model:", error);
    }
  };

  const handleEdit = (model: MotorcycleModel) => {
    setEditingModel(model);
    setFormData({
      brandId: model.brandId,
      modelName: model.modelName,
      yearStart: model.yearStart,
      yearEnd: model.yearEnd,
      isCurrent: model.isCurrent,
      engineDisplacement: model.engineDisplacement,
      engineType: model.engineType || "",
      powerHp: model.powerHp,
      description: model.description || "",
      createdBy: "admin",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await motorcycleModelService.delete(id);
      loadData();
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingModel(null);
    setFormData({
      brandId: 0,
      modelName: "",
      yearStart: new Date().getFullYear(),
      yearEnd: null,
      isCurrent: true,
      engineDisplacement: undefined,
      engineType: "",
      powerHp: undefined,
      description: "",
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
    textarea: {
      width: "100%",
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      minHeight: "100px",
    },
    checkbox: {
      marginRight: "8px",
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
        <h1 style={styles.title}>Motorcycle Models Administration</h1>
        <button style={styles.button} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add New Model"}
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>{editingModel ? "Edit Model" : "New Model"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
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
                      {brand.brandName} ({brand.countryOfOrigin})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Model Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="modelName"
                  value={formData.modelName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Year Start *</label>
                <input
                  style={styles.input}
                  type="number"
                  name="yearStart"
                  value={formData.yearStart}
                  onChange={handleInputChange}
                  min="1900"
                  max="2100"
                  required
                />
              </div>

              <div>
                <label>Year End (leave empty if current)</label>
                <input
                  style={styles.input}
                  type="number"
                  name="yearEnd"
                  value={formData.yearEnd || ""}
                  onChange={handleInputChange}
                  min="1900"
                  max="2100"
                />
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={styles.checkbox}
                    type="checkbox"
                    name="isCurrent"
                    checked={formData.isCurrent}
                    onChange={handleInputChange}
                  />
                  Currently in production
                </label>
              </div>

              <div>
                <label>Engine Displacement (cc)</label>
                <input
                  style={styles.input}
                  type="number"
                  name="engineDisplacement"
                  value={formData.engineDisplacement || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>Engine Type</label>
                <select
                  style={styles.select}
                  name="engineType"
                  value={formData.engineType}
                  onChange={handleInputChange}
                >
                  <option value="">Select type</option>
                  <option value="4-stroke">4-stroke</option>
                  <option value="2-stroke">2-stroke</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label>Power (hp)</label>
                <input
                  style={styles.input}
                  type="number"
                  name="powerHp"
                  value={formData.powerHp || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label>Description</label>
                <textarea
                  style={styles.textarea}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button style={styles.button} type="submit">
                {editingModel ? "Update Model" : "Create Model"}
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
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Brand</th>
              <th style={styles.th}>Model</th>
              <th style={styles.th}>Years</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Engine</th>
              <th style={styles.th}>Power</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.modelId}>
                <td style={styles.td}>{model.modelId}</td>
                <td style={styles.td}>{model.brandName}</td>
                <td style={styles.td}>{model.modelName}</td>
                <td style={styles.td}>
                  {model.yearStart} - {model.yearEnd || "Present"}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "9999px",
                      backgroundColor: model.isCurrent ? "#10b981" : "#9ca3af",
                      color: "white",
                    }}
                  >
                    {model.isCurrent ? "Current" : "Discontinued"}
                  </span>
                </td>
                <td style={styles.td}>
                  {model.engineDisplacement ? `${model.engineDisplacement}cc` : "-"}
                </td>
                <td style={styles.td}>{model.powerHp ? `${model.powerHp} hp` : "-"}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.buttonEdit }}
                    onClick={() => handleEdit(model)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonDanger }}
                    onClick={() => handleDelete(model.modelId)}
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

export default MotorcycleModelAdmin;

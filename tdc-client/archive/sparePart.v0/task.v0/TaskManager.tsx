// src/components/Task/TaskManager.tsx
import React, { useState, useEffect } from "react";
import { _createTask, _updateTask, _deleteTask, _taskList } from "./task.service";
import { _getCorrespondanceBySubject } from "../correspondance/service";
import { _getAllBrands } from "../brand/service";
import type { Task, CreateTaskDto } from "./task.types";
import type { Correspondance } from "../correspondance/types";
import type { Brand } from "../brand/types";
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
  Select,
  Textarea,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  StatusBadge,
} from "../../common/common.styled";
import { TASK_INIT } from "../../common/constant";
import { splitTaskCode } from "../../common/common";
import { Input } from "../UI/Input";
import { useTranslation } from "react-i18next";

export function TaskManager() {
  const { t } = useTranslation(["task"]);

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>(TASK_INIT);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Dropdown data
  const [categories, setCategories] = useState<Correspondance[]>([]);
  const [subcategories, setSubcategories] = useState<Correspondance[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<string>("");
  const [selectedSubCategoryCode, setSelectedSubCategoryCode] = useState<string>("");

  const [selectedBrandCode, setSelectedBrandCode] = useState<string>("AL");
  const [tempName, setTempName] = useState<string>("All");

  const [count, setCount] = useState<number>(42);

  // Form state
  //   const [formData, setFormData] = useState<Task>(TASK_INIT);

  // Load all data
  useEffect(() => {
    loadTasks();
    loadCategories();
    loadSubcategories();
    loadBrands();
  }, [count]);

  const loadTasks = async () => {
    const res = await _taskList();
    if (res.success) setTaskList(res.data || []);
    setLoading(false);
  };

  const loadCategories = async () => {
    const res = await _getCorrespondanceBySubject(500);
    if (res.success) setCategories(res.data || []);
    else console.log("loadCategories res", res);
  };

  const loadSubcategories = async () => {
    const res = await _getCorrespondanceBySubject(600);
    if (res.success) setSubcategories(res.data || []);
  };

  const loadBrands = async () => {
    const res = await _getAllBrands({ limit: 0 });
    if (res.success) setBrands(res.data || []);
    else console.log("loadBrands res", res);
  };

  // Generate a unique task code based on selections + timestamp
  const generateTempTaskCode = (catCode: string, subCode: string, brdCode: string): string => {
    return `${catCode}${subCode}${brdCode}`;
  };

  //   const handleDropdownChange = (
  //     field: "categoryCode" | "subcategoryCode" | "brandCode",
  //     value: string,
  //   ) => {
  //     const newCode = generateTempTaskCode(value, selectedSubcategoryCode, selectedBrandCode);
  //     const newTask = { ...task, [field]: value };
  //     // Auto‑generate code when all three are selected
  //     if (newForm.categoryCode && newForm.subcategoryCode && newForm.brandCode) {
  //       newForm.code = generateTempTaskCode(
  //         newForm.categoryCode,
  //         newForm.subcategoryCode,
  //         newForm.brandCode,
  //       );
  //     } else {
  //       newForm.code = "";
  //     }
  //     setFormData(newForm);
  //   };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleCategoryChange = (value: string) => {
    setSelectedCategoryCode(value);

    const newCode = generateTempTaskCode(value, selectedSubCategoryCode, selectedBrandCode);
    const newTask: Task = { ...task, code: newCode };
    setTask(newTask);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategoryCode(value);
    const newCode = generateTempTaskCode(selectedCategoryCode, value, selectedBrandCode);
    const newTask: Task = { ...task, code: newCode };
    setTask(newTask);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleBrandChange = (value: string) => {
    const newValue = value ? value : "AL";
    setSelectedBrandCode(newValue);
    const newCode = generateTempTaskCode(selectedCategoryCode, selectedSubCategoryCode, newValue);
    const newTask: Task = { ...task, code: newCode };
    setTask(newTask);
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const openCreateModal = () => {
    setEditingTask(null);
    setTask(TASK_INIT);
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    // Extract codes from task.code (format: CAT-SUB-BRAND-xxx)

    setTask(task);

    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!task.name) {
      alert("Task name is required");
      return;
    }
    // Build DTO
    const parts: string[] = splitTaskCode(task.code);
    const payload: CreateTaskDto = {
      code: task.code,
      name: task.name,
      description: task.description,
      durationHours: task.durationHours,
      skillLevel: task.skillLevel,
      brandId: brands.find((b) => b.code === parts[2])?.id || 0,
      isActive: task.isActive,
      createdBy: "admin", // or from auth context
    };

    let response;
    if (editingTask) {
      response = await _updateTask(editingTask.id, payload);
    } else {
      response = await _createTask(payload);
    }
    if (response.success) {
      setModalOpen(false);
      loadTasks();
    } else {
      alert(response.error || "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const res = await _deleteTask(id);
      if (res.success) loadTasks();
      else alert(res.error);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------
  const handleCount = () => {
    console.log("handleCount", count);
    setCount((prev) => prev + 1);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------

  if (loading) return <div>Loading tasks...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Catalog</CardTitle>
        <Button variant="primary" onClick={openCreateModal}>
          + New Task
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Duration (h)</Th>
              <Th>Skill Level</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {taskList.map((task) => (
              <Tr key={task.id}>
                <Td>{task.code}</Td>
                <Td>{task.name}</Td>
                <Td>{task.durationHours}</Td>
                <Td>{task.skillLevel}</Td>
                <Td style={{ display: "flex", alignItems: "center", gap: "1px" }}>
                  <StatusBadge $status={task.isActive ? 1 : 0}>
                    {task.isActive ? "✅" : "❌"}
                  </StatusBadge>

                  <Button
                    variant="secondary"
                    onClick={() => openEditModal(task)}
                    style={{ background: "none", padding: "4px 8px", minWidth: "auto" }}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(task.id)}
                    style={{ background: "none", padding: "4px 8px", minWidth: "auto" }}
                  >
                    🗑️
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardContent>

      {/* Modal for Create / Edit */}
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingTask ? "Edit Task" : "Create New Task"}</ModalTitle>
              <button onClick={() => setModalOpen(false)}>✕</button>
            </ModalHeader>
            <ModalBody>
              {/* Category */}
              <div style={{ marginBottom: 12 }}>
                <label>Category *</label>
                <Select
                  name="categoryCode"
                  value={selectedCategoryCode}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">-- Select category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.value}>
                      {cat.value} - {cat.description}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Subcategory */}
              <div style={{ marginBottom: 12 }}>
                <label>Subcategory *</label>
                <Select
                  name="subcategoryCode"
                  value={selectedSubCategoryCode}
                  onChange={(e) => handleSubCategoryChange(e.target.value)}
                  disabled={selectedCategoryCode == ""}
                >
                  <option value="">-- Select subcategory --</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.value}>
                      {sub.value} - {sub.description}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Brand */}
              <div style={{ marginBottom: 12 }}>
                <label>Brand *{brands[0].code}</label>
                <Select
                  name="brandCode"
                  value={selectedBrandCode}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  disabled={selectedSubCategoryCode == ""}
                >
                  <option value="">-- Select brand --</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.code}>
                      {b.code}-{b.name}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Generated Code (readonly if auto) */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  label={t("taskCode")}
                  name="code"
                  value={task.code}
                  readOnly={!editingTask}
                  placeholder="Auto‑generated"
                />
              </div>

              {/* Name */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  label={t("taskName")}
                  name="name"
                  value={tempName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: 12 }}>
                <Textarea
                  name="description"
                  value={task.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              {/* Duration Hours */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  label={t("duration")}
                  type="number"
                  name="durationHours"
                  value={task.durationHours}
                  onChange={handleInputChange}
                  step="1"
                  min="1"
                />
              </div>

              {/* Skill Level */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  label={t("skillLevel")}
                  type="number"
                  name="skillLevel"
                  value={task.skillLevel}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                />
              </div>

              {/* Active */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  label={t("Active")}
                  type="checkbox"
                  name="isActive"
                  checked={task.isActive}
                  onChange={handleInputChange}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={handleCount}>
                count {count}
              </Button>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                {editingTask ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Card>
  );
}

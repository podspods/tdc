import { Select } from "react-i18next/icu.macro";
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "../../common/common.styled";

export type ModalCreateTaskProps = {
  setModalOpen: (isOpen: boolean) => void;
};
export default function ModalCreateTask({ ...props }: ModalCreateTaskProps) {
  return (
    <>
      <h1>ModalCreateTask</h1>
      <ModalOverlay onClick={() => props.setModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{editingTask ? "Edit Task" : "Create New Task"}</ModalTitle> ?????
            <button onClick={() => props.setModalOpen(false)}>✕</button>
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
            <Button v$ariant="secondary" onClick={handleCount}>
              count {count}
            </Button>
            <Button $variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingTask ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

import { useEffect, useMemo, useState } from "react";
import type { Correspondance } from "../components/correspondance/types";

import {
  _getAllCorrespondances,
  _createCorrespondance,
  _updateCorrespondance,
  _deleteCorrespondance,
} from "../components/correspondance/service"; // adjust path if needed
import { useTranslation } from "react-i18next";
import { Button, FilterBar, SearchInput } from "../common/common.styled";
import Modal from "../components/correspondance/Modal";
import Mobil from "../components/correspondance/Mobil";
import Desktop from "../components/correspondance/Desktop";

export default function Correspondance() {
  const { t } = useTranslation(["correspondance"]);

  const [items, setItems] = useState<Correspondance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Correspondance | null>(null);

  const [filterSubjectCode, setFilterSubjectCode] = useState<string>("");
  const [filterCode, setFilterCode] = useState<string>("");

  useEffect(() => {
    fetchCorrespondances();
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;
    if (filterSubjectCode) {
      const numFilter = parseInt(filterSubjectCode, 10);
      if (!isNaN(numFilter)) {
        result = result.filter((item) => item.subjectCode === numFilter);
      }
    }
    if (filterCode) {
      const numFilter = parseInt(filterCode, 10);
      if (!isNaN(numFilter)) {
        result = result.filter((item) => item.code === numFilter);
      }
    }
    return result;
  }, [items, filterSubjectCode, filterCode]);
  //--------------------------------------------------------------------------------------------------------------------------

  const fetchCorrespondances = async () => {
    setLoading(true);
    try {
      const response = await _getAllCorrespondances({ limit: 0 });
      if (response.success && response.data) {
        setItems(response.data);
        setError(null);
      } else {
        setError(response.message || "Failed to fetch data");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const resetForm = () => {
    setEditingItem(null);
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (item: Correspondance) => {
    setEditingItem(item);
    // setFormData({
    //   id: item.id,
    //   subjectCode: item.subjectCode,
    //   code: item.code,
    //   valueStr: item.valueStr,
    //   valueNum: item.valueNum,
    //   description: item.description || "",
    //   sortOrder: item.sortOrder ?? undefined,
    //   createdBy: item.createdBy,
    //   createdAt: item.createdAt,
    // });
    setModalOpen(true);
  };

  //--------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------------

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await _deleteCorrespondance(id);
      if (response.success) {
        await fetchCorrespondances();
      } else {
        alert(response.message || "Deletion failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting");
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------

  if (loading) return <div className="loading">{t("loading")}</div>;
  if (error)
    return (
      <div className="error">
        {t("error")}: {error}
      </div>
    );
  return (
    <>
      <div className="correspondance-page">
        <div className="header">
          <h1>{t("title")}</h1>
          <button className="btn-primary" onClick={openCreateModal}>
            ➕{t("new")}
          </button>
        </div>
        <FilterBar>
          <SearchInput
            type="number"
            placeholder={t("filterSubjectCode")}
            value={filterSubjectCode}
            onChange={(e) => setFilterSubjectCode(e.target.value)}
          />
          <SearchInput
            type="number"
            placeholder={t("filterCode")}
            value={filterCode}
            onChange={(e) => setFilterCode(e.target.value)}
          />
          <Button
            $variant="secondary"
            onClick={() => {
              setFilterSubjectCode("");
              setFilterCode("");
            }}
          >
            🧹
          </Button>
        </FilterBar>
        {/* Mobile cards / Desktop table */}
        <div className="items-container">
          {filteredItems.length === 0 ? (
            <p>{t("found")}</p>
          ) : (
            <>
              {/* Desktop table view */}
              <Desktop
                openEditModal={openEditModal}
                handleDelete={handleDelete}
                filteredItems={filteredItems}
              />

              {/* Mobile card view */}
              <Mobil
                openEditModal={openEditModal}
                handleDelete={handleDelete}
                filteredItems={filteredItems}
              />
            </>
          )}
        </div>
        {/* Modal for create/edit */}
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            editingItem={editingItem}
            fetchCorrespondances={fetchCorrespondances}
          />
        )}
      </div>
    </>
  );
}

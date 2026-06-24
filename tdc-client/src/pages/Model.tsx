// src/pages/Model.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { _getAllModels, _deleteModel } from "../components/model/service";
import type { Model, ModelQueryParams } from "../components/model/types";
import ModelModal from "../components/model/Modal";
import {
  Button,
  FilterBar,
  SearchInput,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Pagination,
  PageButton,
} from "../common/common.styled";
import { _getAllBrands } from "../components/brand/service";
import type { Brand } from "../components/brand/types";

// Mobile card container (visible on small screens)
const MobileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardField = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const DesktopTable = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function Model() {
  const { t } = useTranslation(["model"]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [filters, setFilters] = useState<ModelQueryParams>({
    page: 1,
    limit: -1,
    brandId: undefined,
    isCurrent: undefined,
    search: "",
    minYear: undefined,
    maxYear: undefined,
  });

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await _getAllModels(filters);
      if (response.success && response.data) {
        setModels(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination?.total || 0,
        }));
        setError(null);
      } else {
        setError(response.message || t("fetchError"));
      }
    } catch (err) {
      setError(t("unexpectedError"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [filters]);

  // Load brands on mount
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const response = await _getAllBrands({ limit: 0 }); // limit 0 = no pagination
        if (response.success && response.data) {
          console.log("_getAllBrands", response.data);
          setBrandList(response.data);
        }
      } catch (error) {
        console.error("Failed to load brands", error);
      }
    };
    loadBrands();
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------

  const handleFilterChange = (key: keyof ModelQueryParams, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const openCreateModal = () => {
    setEditingModel(null);
    setModalOpen(true);
  };

  const openEditModal = (model: Model) => {
    setEditingModel(model);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("confirmDelete"))) return;
    try {
      const response = await _deleteModel(id);
      if (response.success) {
        await fetchModels();
      } else {
        alert(response.message || t("deleteError"));
      }
    } catch (err) {
      console.error(err);
      alert(t("deleteError"));
    }
  };

  const totalPages = Math.ceil(pagination.total / filters.limit!);

  if (loading) return <div className="loading">{t("loading")}</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div style={{ padding: "1rem", maxWidth: "1400px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h1>{t("title")}</h1>
        <Button $variant="primary" onClick={openCreateModal}>
          ➕ {t("add")}
        </Button>
      </div>

      {/* Filters */}
      <FilterBar>
        <SearchInput
          type="text"
          placeholder={t("searchByName")}
          value={filters.search || ""}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        <input
          type="number"
          placeholder={t("brandId")}
          value={filters.brandId || ""}
          onChange={(e) =>
            handleFilterChange("brandId", e.target.value ? Number(e.target.value) : undefined)
          }
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "120px",
          }}
        />
        <select
          value={filters.isCurrent === undefined ? "" : filters.isCurrent.toString()}
          onChange={(e) => {
            const val = e.target.value;
            handleFilterChange("isCurrent", val === "" ? undefined : val === "true");
          }}
          style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
        >
          <option value="">{t("allCurrentStatus")}</option>
          <option value="true">{t("current")}</option>
          <option value="false">{t("discontinued")}</option>
        </select>
        <input
          type="number"
          placeholder={t("minYear")}
          value={filters.minYear || ""}
          onChange={(e) =>
            handleFilterChange("minYear", e.target.value ? Number(e.target.value) : undefined)
          }
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100px",
          }}
        />
        <input
          type="number"
          placeholder={t("maxYear")}
          value={filters.maxYear || ""}
          onChange={(e) =>
            handleFilterChange("maxYear", e.target.value ? Number(e.target.value) : undefined)
          }
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100px",
          }}
        />
        <Button $variant="secondary" onClick={() => setFilters({ page: 1, limit: 10 })}>
          {t("clearFilters")}
        </Button>
      </FilterBar>

      {/* Desktop Table */}
      <DesktopTable>
        <Table>
          <Thead>
            <Tr>
              <Th>{t("id")}</Th>
              <Th>{t("brandId")}</Th>
              <Th>{t("brand")}</Th>
              <Th>{t("name")}</Th>
              <Th>{t("yearStart")}</Th>
              <Th>{t("yearEnd")}</Th>
              <Th>{t("isCurrent")}</Th>
              <Th>{t("engine")}</Th>
              <Th>{t("powerHp")}</Th>
              <Th>{t("actions")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {models.map((model) => (
              <Tr key={model.id}>
                <Td>{model.id}</Td>
                <Td>{model.brandId}</Td>
                <Td>{brandList.find((brand) => brand.id === model.brandId)?.name || "-"}</Td>
                <Td>{model.name}</Td>
                <Td>{model.yearStart || "-"}</Td>
                <Td>{model.yearEnd || "-"}</Td>
                <Td>{model.isCurrent ? t("yes") : t("no")}</Td>
                <Td>{model.engineDisplacement ? `${model.engineDisplacement}cc` : "-"}</Td>
                <Td>{model.powerHp || "-"}</Td>
                <Td>
                  <ActionButtons>
                    <Button $variant="secondary" onClick={() => openEditModal(model)}>
                      🖍
                    </Button>
                    <Button $variant="danger" onClick={() => handleDelete(model.id)}>
                      🗑
                    </Button>
                  </ActionButtons>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </DesktopTable>

      {/* Mobile Cards */}
      <MobileCardContainer>
        {models.map((model) => (
          <Card key={model.id}>
            <CardField>
              <strong>{t("name")}:</strong> {model.name}
            </CardField>
            <CardField>
              <strong>{t("brandId")}:</strong>
              {model.brandId}
            </CardField>
            <CardField>
              <strong>{t("brand")}:</strong>
              {brandList.find((brand) => brand.id === model.brandId)?.name || "-"}
            </CardField>
            <CardField>
              <strong>{t("year")}:</strong> {model.yearStart} - {model.yearEnd || t("present")}
            </CardField>
            <CardField>
              <strong>{t("current")}:</strong> {model.isCurrent ? t("yes") : t("no")}
            </CardField>
            <CardField>
              <strong>{t("engine")}:</strong>{" "}
              {model.engineDisplacement ? `${model.engineDisplacement}cc` : "-"}{" "}
              {model.engineType || ""}
            </CardField>
            <CardField>
              <strong>{t("power")}:</strong> {model.powerHp ? `${model.powerHp} hp` : "-"}
            </CardField>
            <ActionButtons style={{ marginTop: "0.5rem" }}>
              <Button $variant="secondary" onClick={() => openEditModal(model)}>
                🖍 {t("edit")}
              </Button>
              <Button $variant="danger" onClick={() => handleDelete(model.id)}>
                🗑 {t("delete")}
              </Button>
            </ActionButtons>
          </Card>
        ))}
      </MobileCardContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            ◀
          </PageButton>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = pagination.page;
            if (totalPages <= 5) pageNum = i + 1;
            else if (pagination.page <= 3) pageNum = i + 1;
            else if (pagination.page >= totalPages - 2) pageNum = totalPages - 4 + i;
            else pageNum = pagination.page - 2 + i;
            return (
              <PageButton
                key={pageNum}
                $active={pagination.page === pageNum}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </PageButton>
            );
          })}
          <PageButton
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
          >
            ▶
          </PageButton>
        </Pagination>
      )}

      {modalOpen && (
        <ModelModal
          setModalOpen={setModalOpen}
          editingItem={editingModel}
          fetchModels={fetchModels}
          brandList={brandList}
        />
      )}
    </div>
  );
}

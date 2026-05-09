import { useCallback, useState } from "react";
import type {
  CreateSparePartDto,
  UpdateSparePartDto,
  SparePart,
  SparePartQueryParams,
  SparePartStats,
} from "./sparePart.types";
import { SPARE_PART_INIT, STATS_SPARE_PART_INIT } from "../../common/constant";
import {
  _createSparePart,
  _updateSparePart,
  _sparePartList,
  _sparePartStats,
} from "./sparePart.service";

export function useSparePart() {
  const [sparePartList, setSparePartList] = useState<SparePart[]>([]);
  const [stats, setStats] = useState<SparePartStats>(STATS_SPARE_PART_INIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("init-no-error");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filters, setFilters] = useState<SparePartQueryParams>({});

  //--------------------------------------------------------------------------------------------------------------------------

  const sparePartlist = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { ...filters, page, limit };
      const response = await _sparePartList(params);
      if (response.success) {
        setSparePartList(response.data || []);
        setTotal(response.pagination?.total || 0);
      } else {
        setError(response.error || "Failed to load owners");
      }
    } catch (err) {
      setError("Failed to load owners");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  //--------------------------------------------------------------------------------------------------------------------------

  const sparePartStats = useCallback(async () => {
    try {
      const response = await _sparePartStats();
      if (response.success) {
        setStats(response.data || STATS_SPARE_PART_INIT);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------
  const createSparePart = useCallback(
    async (createSparePartDto: CreateSparePartDto): Promise<SparePart> => {
      setLoading(true);
      try {
        console.log("createSparePart", createSparePartDto);

        const response = await _createSparePart(createSparePartDto);
        if (response.success && response.data) {
          await sparePartlist();
          await sparePartStats();
          return response.data;
        }
        setError(response.error || "Failed to create sparePart");
        return SPARE_PART_INIT;
      } catch (error) {
        setError("Failed to create sparePart");
        return SPARE_PART_INIT;
      } finally {
        setLoading(false);
      }
    },
    [sparePartlist, sparePartStats],
  );

  //--------------------------------------------------------------------------------------------------------------------------

  const updateSparePart = useCallback(
    async (id: number, sparePart: UpdateSparePartDto) => {
      console.log("updateSparePart sparePart", sparePart);
      console.log("updateSparePart id", id);
      setLoading(true);
      try {
        const response = await _updateSparePart(id, sparePart);
        if (response.success) {
          await sparePartlist();
          await sparePartStats();
          return response.data;
        }
        setError(response.error || "Failed to update owner");
        return null;
      } catch (err) {
        setError("Failed to update owner");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [sparePartlist, sparePartStats],
  );
  //--------------------------------------------------------------------------------------------------------------------------

  function deleteSparePart() {}
  function searchSpareParts() {}
  //--------------------------------------------------------------------------------------------------------------------------

  return {
    sparePartList,
    loading,

    stats,
    error,
    total,
    page,
    limit,
    filters,
    setPage,
    setFilters,
    createSparePart,
    updateSparePart,
    deleteSparePart,
    searchSpareParts,
    refresh: sparePartlist,
  };
}

import { useState, useEffect, useCallback } from "react";
import type { CreateOwnerDto, Owner, OwnerQueryParams, OwnerStats } from "./owner.types";
import {
  _createOwner,
  _deleteOwner,
  _searchOwners,
  _updateOwner,
  _getAllOwners,
  _getOwnerStats,
} from "./service";
import { OWNER_INIT, STATS_INIT } from "../../common/constant";

export function useOwner() {
  const [ownerList, setOwnerList] = useState<Owner[]>([]);
  const [stats, setStats] = useState<OwnerStats>(STATS_INIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("init-no-error");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filters, setFilters] = useState<OwnerQueryParams>({});

  const loadOwners = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { ...filters, page, limit };
      const response = await _getAllOwners(params);

      if (response.success) {
        setOwnerList(response.data || []);
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

  const loadStats = useCallback(async () => {
    try {
      const response = await _getOwnerStats();
      if (response.success) {
        setStats(response.data || STATS_INIT);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);
  //--------------------------------------------------------------------------------------------------------------------------

  const createOwner = useCallback(
    async (data: CreateOwnerDto): Promise<Owner> => {
      setLoading(true);
      try {
        const response = await _createOwner(data);
        if (response.success && response.data) {
          await loadOwners();
          await loadStats();
          return response.data;
        }
        setError(response.error || "Failed to create owner");
        return OWNER_INIT;
      } catch (err) {
        setError("Failed to create owner");
        return OWNER_INIT;
      } finally {
        setLoading(false);
      }
    },
    [loadOwners, loadStats],
  );

  //--------------------------------------------------------------------------------------------------------------------------

  const updateOwner = useCallback(
    async (id: number, data: any) => {
      setLoading(true);
      try {
        const response = await _updateOwner(id, data);
        if (response.success) {
          await loadOwners();
          await loadStats();
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
    [loadOwners, loadStats],
  );
  //--------------------------------------------------------------------------------------------------------------------------

  const deleteOwner = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        const response = await _deleteOwner(id);
        if (response.success) {
          await loadOwners();
          await loadStats();
          return true;
        }
        setError(response.error || "Failed to delete owner");
        return false;
      } catch (err) {
        setError("Failed to delete owner");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadOwners, loadStats],
  );
  //--------------------------------------------------------------------------------------------------------------------------

  const searchOwners = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await _searchOwners(query);
      if (response.success) {
        setOwnerList(response.data || []);
        setTotal(response.data?.length || 0);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOwners();
  }, [loadOwners]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    ownerList,
    stats,
    loading,
    error,
    total,
    page,
    limit,
    filters,
    setPage,
    setFilters,
    createOwner,
    updateOwner,
    deleteOwner,
    searchOwners,
    refresh: loadOwners,
  };
}
//--------------------------------------------------------------------------------------------------------------------------

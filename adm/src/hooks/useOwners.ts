import { useState, useEffect, useCallback } from "react";
import type { Owner, OwnersQueryParams } from "../components/Owners/Owners.types";
import * as ownersService from "../components/Owners/Owners.service";

export function useOwners() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [stats, setStats] = useState<number | 0>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filters, setFilters] = useState<OwnersQueryParams>({});

  const loadOwners = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { ...filters, page, limit };
      const response = await ownersService.getAllOwners(params);
      if (response.success) {
        setOwners(response.data || []);
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

  const loadStats = useCallback(async () => {
    try {
      const response = await ownersService.getOwnerStats();
      if (response.success) {
        setStats(response.data || null);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  const createOwner = useCallback(
    async (data: any) => {
      setLoading(true);
      try {
        const response = await ownersService.createOwner(data);
        if (response.success) {
          await loadOwners();
          await loadStats();
          return response.data;
        }
        setError(response.error || "Failed to create owner");
        return null;
      } catch (err) {
        setError("Failed to create owner");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [loadOwners, loadStats],
  );

  const updateOwner = useCallback(
    async (id: number, data: any) => {
      setLoading(true);
      try {
        const response = await ownersService.updateOwner(id, data);
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

  const deleteOwner = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        const response = await ownersService.deleteOwner(id);
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

  const searchOwners = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await ownersService.searchOwners(query);
      if (response.success) {
        setOwners(response.data || []);
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
    owners,
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

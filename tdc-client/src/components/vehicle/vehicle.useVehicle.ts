import { useCallback, useState } from "react";
import type {
  CreateVehicleDto,
  UpdateVehicleDto,
  Vehicle,
  VehicleQueryParams,
  VehicleStats,
} from "./vehicle.types";
import { STATS_VEHICLE_INIT, VEHICLE_INIT } from "../../common/constant";
import { _createVehicle, _updateVehicle, _vehicleList, _vehicleStats } from "./vehicle.service";

export function useVehicle() {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [stats, setStats] = useState<VehicleStats>(STATS_VEHICLE_INIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("init-no-error");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filters, setFilters] = useState<VehicleQueryParams>({});

  //--------------------------------------------------------------------------------------------------------------------------

  const vehiclelist = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { ...filters, page, limit };
      const response = await _vehicleList(params);

      if (response.success) {
        setVehicleList(response.data || []);
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

  const vehicleStats = useCallback(async () => {
    try {
      const response = await _vehicleStats();
      if (response.success) {
        setStats(response.data || STATS_VEHICLE_INIT);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------
  const createVehicle = useCallback(
    async (createVehicleDto: CreateVehicleDto): Promise<Vehicle> => {
      setLoading(true);
      try {
        console.log("createVehicle", createVehicleDto);

        const response = await _createVehicle(createVehicleDto);
        if (response.success && response.data) {
          await vehiclelist();
          await vehicleStats();
          return response.data;
        }
        setError(response.error || "Failed to create vehicle");
        return VEHICLE_INIT;
      } catch (error) {
        setError("Failed to create vehicle");
        return VEHICLE_INIT;
      } finally {
        setLoading(false);
      }
    },
    [vehiclelist, vehicleStats],
  );

  //--------------------------------------------------------------------------------------------------------------------------

  const updateVehicle = useCallback(
    async (id: number, vehicle: UpdateVehicleDto) => {
      console.log("updateVehicle vehicle", vehicle);
      console.log("updateVehicle id", id);
      setLoading(true);
      try {
        const response = await _updateVehicle(id, vehicle);
        if (response.success) {
          await vehiclelist();
          await vehicleStats();
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
    [vehiclelist, vehicleStats],
  );
  //--------------------------------------------------------------------------------------------------------------------------

  function deleteVehicle() {}
  function searchVehicles() {}
  //--------------------------------------------------------------------------------------------------------------------------

  return {
    vehicleList,
    loading,

    stats,
    error,
    total,
    page,
    limit,
    filters,
    setPage,
    setFilters,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    searchVehicles,
    refresh: vehiclelist,
  };
}

import { FastifyInstance } from "fastify";
import {
  CreateConsumableDto,
  UpdateConsumableDto,
  ConsumableQueryParams,
  StockMovement,
} from "../types/consumable.types";
import { createConsumableRepository } from "../repositories/consumable.repository";

export const createConsumableService = (fastify: FastifyInstance) => {
  const repository = createConsumableRepository(fastify);

  /**
   * Get all consumables with filters
   */
  const getAllConsumables = async (params: ConsumableQueryParams = {}) => {
    const { data, total } = await repository.findAll(params);

    return {
      data,
      pagination: {
        page: params.page || 1,
        limit: params.limit || 20,
        total,
        pages: Math.ceil(total / (params.limit || 20)),
      },
    };
  };

  /**
   * Get low stock consumables
   */
  const getLowStockConsumables = async () => {
    return await repository.findLowStock();
  };

  /**
   * Get consumable by ID
   */
  const getConsumableById = async (id: number) => {
    const consumable = await repository.findById(id);
    if (!consumable) {
      throw new Error("Consumable not found");
    }
    return consumable;
  };

  /**
   * Get consumable by code
   */
  const getConsumableByCode = async (code: string) => {
    const consumable = await repository.findByCode(code);
    if (!consumable) {
      throw new Error("Consumable not found");
    }
    return consumable;
  };

  /**
   * Create new consumable
   */
  const createConsumable = async (data: CreateConsumableDto) => {
    const existing = await repository.findByCode(data.consumableCode);
    if (existing) {
      throw new Error("Consumable code already exists");
    }
    return await repository.create(data);
  };

  /**
   * Update consumable
   */
  const updateConsumable = async (id: number, data: UpdateConsumableDto) => {
    const consumable = await repository.findById(id);
    if (!consumable) {
      throw new Error("Consumable not found");
    }
    const updated = await repository.update(id, data);
    if (!updated) {
      throw new Error("No fields to update");
    }
    return updated;
  };

  /**
   * Update stock
   */
  const updateStock = async (id: number, movement: StockMovement) => {
    const consumable = await repository.findById(id);
    if (!consumable) {
      throw new Error("Consumable not found");
    }

    // Validate stock for outgoing movements
    if (movement.type === "out" || movement.type === "adjustment") {
      const newStock =
        movement.type === "out" ? consumable.currentStock - movement.quantity : movement.quantity; // adjustment sets absolute value

      if (newStock < 0) {
        throw new Error(`Insufficient stock. Current: ${consumable.currentStock}`);
      }
    }

    return await repository.updateStock(id, movement);
  };

  /**
   * Delete consumable
   */
  const deleteConsumable = async (id: number) => {
    const consumable = await repository.findById(id);
    if (!consumable) {
      throw new Error("Consumable not found");
    }
    const deleted = await repository.delete(id);
    if (!deleted) {
      throw new Error("Failed to delete consumable");
    }
    return { message: "Consumable deleted successfully" };
  };

  return {
    getAllConsumables,
    getLowStockConsumables,
    getConsumableById,
    getConsumableByCode,
    createConsumable,
    updateConsumable,
    updateStock,
    deleteConsumable,
  };
};

export type ConsumableService = ReturnType<typeof createConsumableService>;

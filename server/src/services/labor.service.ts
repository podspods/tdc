import { FastifyInstance } from "fastify";
import { createLaborRepository } from "../repositories/labor.repository";
import { CreateLaborDto, UpdateLaborDto, LaborQueryParams } from "../types/labor.types";

export const createLaborService = (fastify: FastifyInstance) => {
  const repository = createLaborRepository(fastify);

  const getAllLabor = async (params: LaborQueryParams = {}) => {
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

  const getLaborById = async (id: number) => {
    const labor = await repository.findById(id);
    if (!labor) {
      throw new Error("Labor not found");
    }
    return labor;
  };

  const getLaborByCode = async (code: string) => {
    const labor = await repository.findByCode(code);
    if (!labor) {
      throw new Error("Labor not found");
    }
    return labor;
  };

  const createLabor = async (data: CreateLaborDto) => {
    const existing = await repository.findByCode(data.laborCode);
    if (existing) {
      throw new Error("Labor code already exists");
    }
    return await repository.create(data);
  };

  const updateLabor = async (id: number, data: UpdateLaborDto) => {
    const labor = await repository.findById(id);
    if (!labor) {
      throw new Error("Labor not found");
    }
    const updated = await repository.update(id, data);
    if (!updated) {
      throw new Error("No fields to update");
    }
    return updated;
  };

  const deleteLabor = async (id: number) => {
    const labor = await repository.findById(id);
    if (!labor) {
      throw new Error("Labor not found");
    }
    const deleted = await repository.delete(id);
    if (!deleted) {
      throw new Error("Failed to delete labor");
    }
    return { message: "Labor deleted successfully" };
  };

  return {
    getAllLabor,
    getLaborById,
    getLaborByCode,
    createLabor,
    updateLabor,
    deleteLabor,
  };
};

export type LaborService = ReturnType<typeof createLaborService>;

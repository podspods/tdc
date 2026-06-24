// backend/src/entities/partAndLabor/service.ts
import { FastifyInstance } from "fastify";
import * as repository from "./repository";
import type {
  PartAndLabor,
  CreatePartAndLaborDto,
  UpdatePartAndLaborDto,
  PartAndLaborQueryParams,
} from "./types";

export async function getAllPartAndLabor(
  fastify: FastifyInstance,
  params: PartAndLaborQueryParams = {},
): Promise<{ data: PartAndLabor[]; total: number }> {
  //----------------------------------------------------------------------------------------------
  let {
    page = 1,
    limit = 20,
    typeLineCode,
    categoryCode,
    subCategoryCode,
    brandCode,
    search,
  } = params;
  //----------------------------------------------------------------------------------------------
  const noPagination = limit !== undefined && limit <= 0;
  const effectivePage = !noPagination && page !== undefined && page > 0 ? page : 1;
  const effectiveLimit = !noPagination && limit !== undefined && limit > 0 ? limit : 20;
  const offset = !noPagination ? (effectivePage - 1) * effectiveLimit : 0;
  //----------------------------------------------------------------------------------------------
  const conditions: string[] = [];
  const values: any[] = [];
  let idx = 1;
  //----------------------------------------------------------------------------------------------
  if (typeLineCode) {
    conditions.push(`type_line_code = $${idx++}`);
    values.push(typeLineCode);
  }
  if (categoryCode) {
    conditions.push(`category_code = $${idx++}`);
    values.push(categoryCode);
  }
  if (subCategoryCode) {
    conditions.push(`sub_category_code = $${idx++}`);
    values.push(subCategoryCode);
  }
  if (brandCode) {
    conditions.push(`brand_code = $${idx++}`);
    values.push(brandCode);
  }
  if (search) {
    conditions.push(`(name ILIKE $${idx} OR code ILIKE $${idx} OR description ILIKE $${idx})`);
    values.push(`%${search}%`);
    idx++;
  }
  //----------------------------------------------------------------------------------------------
  const whereClause = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const total = await repository.count(fastify, whereClause, values);
  //----------------------------------------------------------------------------------------------
  let data: PartAndLabor[];
  if (noPagination) {
    data = await repository.findAll(fastify, whereClause, values, undefined, 0);
  } else {
    data = await repository.findAll(fastify, whereClause, values, effectiveLimit, offset);
  }
  //----------------------------------------------------------------------------------------------
  return { data, total };
}

export async function getPartAndLaborById(
  fastify: FastifyInstance,
  id: number,
): Promise<PartAndLabor | null> {
  return repository.findById(fastify, id);
}

export async function getPartAndLaborByCode(
  fastify: FastifyInstance,
  code: string,
): Promise<PartAndLabor | null> {
  return repository.findByCode(fastify, code);
}

export async function createPartAndLabor(
  fastify: FastifyInstance,
  data: CreatePartAndLaborDto,
): Promise<PartAndLabor> {
  return repository.create(fastify, data);
}

export async function updatePartAndLabor(
  fastify: FastifyInstance,
  id: number,
  data: UpdatePartAndLaborDto,
): Promise<PartAndLabor | null> {
  return repository.update(fastify, id, data);
}

export async function deletePartAndLabor(fastify: FastifyInstance, id: number): Promise<boolean> {
  return repository.remove(fastify, id);
}

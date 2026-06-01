import { FastifyInstance } from "fastify";
import * as repo from "./repository";
import {
  CreateCorrespondanceDto,
  UpdateCorrespondanceDto,
  CorrespondanceQueryParams,
} from "./types";
import { defaultLimit, defaultPageNumber } from "../../common/constant";

export async function getAllCorrespondances(
  fastify: FastifyInstance,
  params: CorrespondanceQueryParams = {},
) {
  const { data, total } = await repo.findAllCorrespondances(fastify, params);
  return {
    data,
    pagination: {
      page: params.page || defaultPageNumber,
      limit: params.limit || defaultLimit,
      total,
      pages: Math.ceil(total / (params.limit || 20)),
    },
  };
}

export async function getCorrespondanceById(fastify: FastifyInstance, id: number) {
  const record = await repo.findCorrespondanceById(fastify, id);
  if (!record) throw new Error("Correspondance not found");
  return record;
}

export async function getCorrespondanceBySubjectAndCode(
  fastify: FastifyInstance,
  subjectCode: number,
  code: number,
) {
  const record = await repo.findCorrespondanceBySubjectCodeAndCode(fastify, subjectCode, code);
  if (!record) throw new Error("Correspondance not found");
  return record;
}

export async function createCorrespondance(
  fastify: FastifyInstance,
  data: CreateCorrespondanceDto,
) {
  const existing = await repo.findCorrespondanceBySubjectCodeAndCode(
    fastify,
    data.subjectCode,
    data.code,
  );
  if (existing) throw new Error("Correspondance with same subjectCode+code already exists");
  return await repo.createCorrespondance(fastify, data);
}

export async function updateCorrespondance(
  fastify: FastifyInstance,
  id: number,
  data: UpdateCorrespondanceDto,
) {
  const existing = await repo.findCorrespondanceById(fastify, id);
  if (!existing) throw new Error("Correspondance not found");
  const updated = await repo.updateCorrespondance(fastify, id, data);
  if (!updated) throw new Error("No fields to update");
  return updated;
}

export async function deleteCorrespondance(fastify: FastifyInstance, id: number) {
  const existing = await repo.findCorrespondanceById(fastify, id);
  if (!existing) throw new Error("Correspondance not found");
  const deleted = await repo.deleteCorrespondance(fastify, id);
  if (!deleted) throw new Error("Failed to delete");
  return { message: "Correspondance deleted successfully" };
}

export async function getBySubject(fastify: FastifyInstance, subjectCode: number) {
  return await repo.findBySubject(fastify, subjectCode);
}

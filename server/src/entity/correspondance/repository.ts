import { FastifyInstance } from "fastify";
import {
  CreateCorrespondanceDto,
  UpdateCorrespondanceDto,
  CorrespondanceQueryParams,
  Correspondance,
} from "./types";
import { defaultLimit, defaultPageNumber } from "../../common/constant";

function mapDbToCorrespondance(row: any): Correspondance {
  return {
    id: row.id,
    subjectCode: row.subject_code,
    code: row.code,
    valueStr: row.valuestr,
    valueNum: row.valuenum,
    description: row.description,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    createdBy: row.created_by,
  };
}

//--------------------------------------------------------------------------------------------------------------------------

export async function findAllCorrespondances(
  fastify: FastifyInstance,
  params: CorrespondanceQueryParams = {},
): Promise<{ data: Correspondance[]; total: number }> {
  const { pg } = fastify;
  const { page, limit, subjectCode, code, search } = params;

  // If limit is provided and <= 0, we disable pagination (no LIMIT clause)
  const noPagination = limit !== undefined && limit <= 0;

  // Set defaults only when pagination is active
  const effectivePage = !noPagination && page !== undefined && page > 0 ? page : 1;
  const effectiveLimit = !noPagination && limit !== undefined && limit > 0 ? limit : 20;
  const offset = !noPagination ? (effectivePage - 1) * effectiveLimit : 0;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (subjectCode !== undefined) {
    whereClause += ` WHERE subject_code = $${idx++}`;
    values.push(subjectCode);
  }
  if (code !== undefined) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` code = $${idx++}`;
    values.push(code);
  }
  if (search) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += ` (valuestr ILIKE $${idx} OR valuenum ILIKE $${idx} OR description ILIKE $${idx})`;
    values.push(`%${search}%`);
    idx++;
  }

  const countQuery = `SELECT COUNT(*) FROM correspondance${whereClause}`;

  // Build data query with or without LIMIT/OFFSET
  let dataQuery = `
    SELECT * FROM correspondance
    ${whereClause}
    ORDER BY subject_code, sort_order, code
  `;

  let dataParams = [...values];
  if (!noPagination) {
    dataQuery += ` LIMIT $${idx} OFFSET $${idx + 1}`;
    dataParams.push(effectiveLimit, offset);
  }

  // Prepare query parameters for data query
  const [countResult, dataResult] = await Promise.all([
    pg.query(countQuery, values),
    pg.query(dataQuery, dataParams),
  ]);
  console.log("dataResult", dataResult);
  return {
    data: dataResult.rows.map(mapDbToCorrespondance),
    total: parseInt(countResult.rows[0].count),
  };
}
//--------------------------------------------------------------------------------------------------------------------------

export async function findCorrespondanceById(
  fastify: FastifyInstance,
  id: number,
): Promise<Correspondance | null> {
  const { pg } = fastify;
  const result = await pg.query("SELECT * FROM correspondance WHERE id = $1", [id]);
  return result.rows[0] ? mapDbToCorrespondance(result.rows[0]) : null;
}

export async function findCorrespondanceBySubjectCodeAndCode(
  fastify: FastifyInstance,
  subjectCode: number,
  code: number,
): Promise<Correspondance | null> {
  const { pg } = fastify;
  const result = await pg.query(
    "SELECT * FROM correspondance WHERE subject_code = $1 AND code = $2",
    [subjectCode, code],
  );
  return result.rows[0] ? mapDbToCorrespondance(result.rows[0]) : null;
}

export async function createCorrespondance(
  fastify: FastifyInstance,
  data: CreateCorrespondanceDto,
): Promise<Correspondance> {
  const { pg } = fastify;
  const { subjectCode, code, valueStr, valueNum, description, sortOrder, createdBy } = data;
  const result = await pg.query(
    `INSERT INTO correspondance (subject_code, code, valuestr,valuenum, description, sort_order, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [subjectCode, code, valueStr, valueNum, description, sortOrder, createdBy],
  );
  return mapDbToCorrespondance(result.rows[0]);
}

export async function updateCorrespondance(
  fastify: FastifyInstance,
  id: number,
  data: UpdateCorrespondanceDto,
): Promise<Correspondance | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    subjectCode: "subject_code",
    code: "code",
    valueStr: "valuestr",
    valueNum: "valuenum",
    description: "description",
    sortOrder: "sort_order",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE correspondance SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToCorrespondance(result.rows[0]) : null;
}

export async function deleteCorrespondance(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query("DELETE FROM correspondance WHERE id = $1 RETURNING id", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}

export async function findBySubject(
  fastify: FastifyInstance,
  subjectCode: number,
): Promise<Correspondance[]> {
  const { pg } = fastify;
  const result = await pg.query(
    `SELECT * FROM correspondance WHERE subject_code = $1 ORDER BY sort_order, code`,
    [subjectCode],
  );
  return result.rows.map(mapDbToCorrespondance);
}

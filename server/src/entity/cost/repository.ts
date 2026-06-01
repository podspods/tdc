import { FastifyInstance } from "fastify";
import { Cost, CreateCostDto, UpdateCostDto, CostQueryParams } from "./types";

function mapDbToCost(row: any): Cost {
  return {
    id: row.id,
    monthlyBase: parseFloat(row.monthly_base),
    dayWork: parseFloat(row.day_work),
    hourWork: parseFloat(row.hour_work),
    effectiveDate: row.effective_date,
    endDate: row.end_date,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findAllCosts(
  fastify: FastifyInstance,
  params: CostQueryParams = {},
): Promise<{ data: Cost[]; total: number }> {
  const { pg } = fastify;
  const { page = 1, limit = 20, effectiveDate } = params;
  const offset = (page - 1) * limit;

  let whereClause = "";
  const values: any[] = [];
  let idx = 1;

  if (effectiveDate) {
    whereClause = ` WHERE effective_date <= $${idx} AND (end_date IS NULL OR end_date >= $${idx})`;
    values.push(effectiveDate);
    idx++;
  }

  const countQuery = `SELECT COUNT(*) FROM cost${whereClause}`;
  const dataQuery = `
    SELECT * FROM cost
    ${whereClause}
    ORDER BY effective_date DESC
    LIMIT $${idx} OFFSET $${idx + 1}
  `;

  const [countResult, dataResult] = await Promise.all([
    pg.query(countQuery, values),
    pg.query(dataQuery, [...values, limit, offset]),
  ]);

  return {
    data: dataResult.rows.map(mapDbToCost),
    total: parseInt(countResult.rows[0].count),
  };
}

export async function findCostById(fastify: FastifyInstance, id: number): Promise<Cost | null> {
  const { pg } = fastify;
  const result = await pg.query("SELECT * FROM cost WHERE id = $1", [id]);
  return result.rows[0] ? mapDbToCost(result.rows[0]) : null;
}

export async function findActiveCostByDate(
  fastify: FastifyInstance,
  date: string,
): Promise<Cost | null> {
  const { pg } = fastify;
  const result = await pg.query(
    `SELECT * FROM cost 
     WHERE effective_date <= $1 AND (end_date IS NULL OR end_date >= $1)
     ORDER BY effective_date DESC
     LIMIT 1`,
    [date],
  );
  return result.rows[0] ? mapDbToCost(result.rows[0]) : null;
}

export async function createCost(fastify: FastifyInstance, data: CreateCostDto): Promise<Cost> {
  const { pg } = fastify;
  const { monthlyBase, dayWork = 0, hourWork = 0, effectiveDate, endDate, createdBy } = data;
  const result = await pg.query(
    `INSERT INTO cost (monthly_base, day_work, hour_work, effective_date, end_date, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [monthlyBase, dayWork, hourWork, effectiveDate, endDate || null, createdBy],
  );
  return mapDbToCost(result.rows[0]);
}

export async function updateCost(
  fastify: FastifyInstance,
  id: number,
  data: UpdateCostDto,
): Promise<Cost | null> {
  const { pg } = fastify;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  const fieldMap: Record<string, string> = {
    monthlyBase: "monthly_base",
    dayWork: "day_work",
    hourWork: "hour_work",
    effectiveDate: "effective_date",
    endDate: "end_date",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && fieldMap[key]) {
      fields.push(`${fieldMap[key]} = $${idx++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE cost SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
  const result = await pg.query(query, values);
  return result.rows[0] ? mapDbToCost(result.rows[0]) : null;
}

export async function deleteCost(fastify: FastifyInstance, id: number): Promise<boolean> {
  const { pg } = fastify;
  const result = await pg.query("DELETE FROM cost WHERE id = $1 RETURNING id", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}

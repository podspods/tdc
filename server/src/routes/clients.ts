import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { clientSchemas } from "../schemas/client.schema";
import { CreateClientDTO, UpdateClientDTO } from "../types";

interface ListQuery {
  page?: number;
  limit?: number;
  search?: string;
}

interface IdParams {
  id: string;
}

export default async function clientRoutes(fastify: FastifyInstance) {
  // GET /api/clients - Liste paginée
  fastify.get(
    "/",
    { schema: clientSchemas.listClients },
    async (request: FastifyRequest<{ Querystring: ListQuery }>, reply: FastifyReply) => {
      const { page = 1, limit = 10, search = "" } = request.query;
      const offset = (page - 1) * limit;

      let countQuery = "SELECT COUNT(*) FROM clients";
      let dataQuery =
        "SELECT id, client_code, last_name, first_name, email, phone, city FROM clients";
      const params: any[] = [];
      let paramIndex = 1;

      if (search) {
        const whereClause = ` WHERE last_name ILIKE $${paramIndex} OR first_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex}`;
        countQuery += whereClause;
        dataQuery += whereClause;
        params.push(`%${search}%`);
      }

      dataQuery += ` ORDER BY id DESC LIMIT $${paramIndex + 1} OFFSET $${paramIndex + 2}`;
      params.push(limit, offset);

      const [countResult, dataResult] = await Promise.all([
        fastify.pg.query(countQuery, params.slice(0, search ? 1 : 0)),
        fastify.pg.query(dataQuery, params),
      ]);

      const total = parseInt(countResult.rows[0].count);
      const pages = Math.ceil(total / limit);

      reply.send({
        success: true,
        data: dataResult.rows,
        pagination: { page, limit, total, pages },
      });
    },
  );

  // GET /api/clients/:id - Client par ID
  fastify.get(
    "/:id",
    { schema: clientSchemas.getClient },
    async (request: FastifyRequest<{ Params: IdParams }>, reply: FastifyReply) => {
      const { id } = request.params;

      const result = await fastify.pg.query("SELECT * FROM clients WHERE id = $1", [id]);

      if (result.rows.length === 0) {
        return reply.status(404).send({
          success: false,
          error: "Client not found",
        });
      }

      reply.send({
        success: true,
        data: result.rows[0],
      });
    },
  );

  // POST /api/clients - Créer un client
  fastify.post(
    "/",
    { schema: clientSchemas.createClient },
    async (request: FastifyRequest<{ Body: CreateClientDTO }>, reply: FastifyReply) => {
      const { client_code, last_name, first_name, email, phone, address, city } = request.body;

      try {
        const result = await fastify.pg.query(
          `INSERT INTO clients (client_code, last_name, first_name, email, phone, address, city)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
          [client_code, last_name, first_name, email, phone, address, city],
        );

        reply.status(201).send({
          success: true,
          data: result.rows[0],
          message: "Client created successfully",
        });
      } catch (error: any) {
        if (error.code === "23505") {
          // Duplicate key
          return reply.status(409).send({
            success: false,
            error: "Client code or email already exists",
          });
        }
        throw error;
      }
    },
  );

  // PUT /api/clients/:id - Mettre à jour un client
  fastify.put(
    "/:id",
    { schema: clientSchemas.updateClient },
    async (
      request: FastifyRequest<{ Params: IdParams; Body: UpdateClientDTO }>,
      reply: FastifyReply,
    ) => {
      const { id } = request.params;
      const updates = request.body;

      // Construire la requête dynamiquement
      const setClause = Object.keys(updates)
        .map((key, i) => `${key} = $${i + 2}`)
        .join(", ");

      if (!setClause) {
        return reply.status(400).send({
          success: false,
          error: "No fields to update",
        });
      }

      const values = [id, ...Object.values(updates)];

      const result = await fastify.pg.query(
        `UPDATE clients SET ${setClause} WHERE id = $1 RETURNING *`,
        values,
      );

      if (result.rows.length === 0) {
        return reply.status(404).send({
          success: false,
          error: "Client not found",
        });
      }

      reply.send({
        success: true,
        data: result.rows[0],
        message: "Client updated successfully",
      });
    },
  );

  // DELETE /api/clients/:id - Supprimer un client
  fastify.delete(
    "/:id",
    async (request: FastifyRequest<{ Params: IdParams }>, reply: FastifyReply) => {
      const { id } = request.params;

      const result = await fastify.pg.query("DELETE FROM clients WHERE id = $1 RETURNING id", [id]);

      if (result.rows.length === 0) {
        return reply.status(404).send({
          success: false,
          error: "Client not found",
        });
      }

      reply.send({
        success: true,
        message: "Client deleted successfully",
      });
    },
  );
}

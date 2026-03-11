import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function poubelleRoutes(fastify: FastifyInstance) {
  // GET /api/clients - Liste paginée
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
}

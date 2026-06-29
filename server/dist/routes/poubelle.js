"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = poubelleRoutes;
async function poubelleRoutes(fastify) {
    // GET /api/clients - Liste paginée
    fastify.get("/:id", { schema: clientSchemas.getClient }, async (request, reply) => {
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
    });
}

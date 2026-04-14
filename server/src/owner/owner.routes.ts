import { FastifyInstance } from "fastify";
import {
  createOwner,
  deleteOwner,
  getAllOwners,
  getOwnerByPhone,
  getOwnerStats,
  getOwnerWithDetails,
  getOwnerWithDetailsgetOwnerById,
  updateOwner,
} from "./owner.controller";
import { CreateOwnerDto, OwnerQueryParams, UpdateOwnerDto } from "./owner.types";

export default async function ownerRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: OwnerQueryParams }>("/", (request, reply) =>
    getAllOwners(fastify, request, reply),
  );

  // GET /api/owners/stats
  fastify.get("/stats", (request, reply) => getOwnerStats(fastify, request, reply));

  // GET /api/owners/phone/:phone
  fastify.get<{ Params: { phone: string } }>("/phone/:phone", (request, reply) =>
    getOwnerByPhone(fastify, request, reply),
  );

  // GET /api/owners/:id/details
  fastify.get<{ Params: { id: string } }>("/:id/details", (request, reply) =>
    getOwnerWithDetails(fastify, request, reply),
  );

  // GET /api/owners/:id
  fastify.get<{ Params: { id: string } }>("/:id", (request, reply) =>
    getOwnerWithDetailsgetOwnerById(fastify, request, reply),
  );

  // POST /api/owners
  fastify.post<{ Body: CreateOwnerDto }>("/", (request, reply) =>
    createOwner(fastify, request, reply),
  );

  // PUT /api/owners/:id
  fastify.put<{ Params: { id: string }; Body: UpdateOwnerDto }>("/:id", (request, reply) =>
    updateOwner(fastify, request, reply),
  );

  // ✅ DELETE /api/owners/:id - utiliser GetByIdRoute, pas Querystring
  fastify.delete<{ Params: { id: string } }>("/:id", (request, reply) =>
    deleteOwner(fastify, request, reply),
  );
  /*
  // GET /api/owners/stats - Get owner statistics
  fastify.get("/stats", controller.getStats);

  // GET /api/owners/phone/:phone - Get owner by phone
  fastify.get("/phone/:phone", controller.getOwnerByPhone);

  // GET /api/owners/:id/details - Get owner with details (motorcycles & invoices)
  fastify.get("/:id/details", controller.getOwnerWithDetails);

  // GET /api/owners/:id - Get owner by ID
  fastify.get("/:id", controller.getOwnerById);

  // POST /api/owners - Create new owner
  fastify.post("/", controller.createOwner);

  // PUT /api/owners/:id - Update owner
  fastify.put("/:id", controller.updateOwner);

  // DELETE /api/owners/:id - Delete owner
  fastify.delete<{ Querystring: OwnerQueryParams }>("/", (request, reply) => 
    deleteOwner(fastify, request, reply)
  )
  //("/:id", controller.deleteOwner);

  */
}

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
import { create, findByPhone } from "./owner.repository";

type GetAllRoute = { Querystring: OwnerQueryParams };
type GetByIdRoute = { Params: { id: string } };
type GetByPhoneRoute = { Params: { phone: string } };
type CreateRoute = { Body: CreateOwnerDto };
type UpdateRoute = { Params: { id: string }; Body: UpdateOwnerDto };

export default async function ownerRoutes(fastify: FastifyInstance) {
  fastify.get<GetAllRoute>("/", (request, reply) => getAllOwners(fastify, request, reply));

  // GET /api/owners/stats
  fastify.get("/stats", (request, reply) => getOwnerStats(fastify, request, reply));

  // GET /api/owners/phone/:phone
  fastify.get<GetByPhoneRoute>("/phone/:phone", (request, reply) =>
    getOwnerByPhone(fastify, request, reply),
  );

  // GET /api/owners/:id/details
  fastify.get<GetByIdRoute>("/:id/details", (request, reply) =>
    getOwnerWithDetails(fastify, request, reply),
  );

  // GET /api/owners/:id
  fastify.get<GetByIdRoute>("/:id", (request, reply) =>
    getOwnerWithDetailsgetOwnerById(fastify, request, reply),
  );

  // POST /api/owners
  fastify.post<CreateRoute>("/", (request, reply) => createOwner(fastify, request, reply));

  // PUT /api/owners/:id
  fastify.put<UpdateRoute>("/:id", (request, reply) => updateOwner(fastify, request, reply));

  fastify.delete<GetByIdRoute>("/:id", (request, reply) => deleteOwner(fastify, request, reply));

  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------

  // POST /api/owners/quick
  fastify.post<{
    Body: { firstName: string; lastName: string; phoneNumber: string; createdBy: string };
  }>("/quick", async (request, reply) => {
    const { firstName, lastName, phoneNumber, createdBy } = request.body;
    const existing = await findByPhone(fastify, phoneNumber);
    if (existing) return reply.send({ success: true, data: existing });
    const newOwner = await create(fastify, { firstName, lastName, phoneNumber, createdBy });
    return reply.send({ success: true, data: newOwner });
  });
}

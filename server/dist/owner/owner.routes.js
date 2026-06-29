"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ownerRoutes;
const owner_controller_1 = require("./owner.controller");
const owner_repository_1 = require("./owner.repository");
async function ownerRoutes(fastify) {
    fastify.get("/", (request, reply) => (0, owner_controller_1.getAllOwners)(fastify, request, reply));
    // GET /api/owners/stats
    fastify.get("/stats", (request, reply) => (0, owner_controller_1.getOwnerStats)(fastify, request, reply));
    // GET /api/owners/phone/:phone
    fastify.get("/phone/:phone", (request, reply) => (0, owner_controller_1.getOwnerByPhone)(fastify, request, reply));
    // GET /api/owners/:id/details
    fastify.get("/:id/details", (request, reply) => (0, owner_controller_1.getOwnerWithDetails)(fastify, request, reply));
    // GET /api/owners/:id
    fastify.get("/:id", (request, reply) => (0, owner_controller_1.getOwnerWithDetailsgetOwnerById)(fastify, request, reply));
    // POST /api/owners
    fastify.post("/", (request, reply) => (0, owner_controller_1.createOwner)(fastify, request, reply));
    // PUT /api/owners/:id
    fastify.put("/:id", (request, reply) => (0, owner_controller_1.updateOwner)(fastify, request, reply));
    fastify.delete("/:id", (request, reply) => (0, owner_controller_1.deleteOwner)(fastify, request, reply));
    //--------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------
    // POST /api/owners/quick
    fastify.post("/quick", async (request, reply) => {
        const { firstName, lastName, phoneNumber, createdBy } = request.body;
        const existing = await (0, owner_repository_1.findByPhone)(fastify, phoneNumber);
        if (existing)
            return reply.send({ success: true, data: existing });
        const newOwner = await (0, owner_repository_1.create)(fastify, {
            firstName,
            lastName,
            phoneNumber,
            createdBy,
            address: "",
            city: "",
            email: "",
            category: 0,
            notes: "",
            updatedAt: new Date(),
            createdAt: new Date(),
        });
        return reply.send({ success: true, data: newOwner });
    });
}

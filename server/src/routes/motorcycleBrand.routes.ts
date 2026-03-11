import { FastifyInstance } from "fastify";
import { createBrandController } from "../controllers/motorcycleBrand.controller";

/**
 * Motorcycle brand routes
 * Base path: /api/motorcycle-brands
 */
export default async function motorcycleBrandRoutes(fastify: FastifyInstance) {
  const controller = createBrandController(fastify);

  // GET /api/motorcycle-brands - Get all brands (paginated)
  fastify.get("/", controller.getAllBrands);

  // GET /api/motorcycle-brands/search - Search brands
  fastify.get("/search", controller.searchBrands);

  // GET /api/motorcycle-brands/by-country - Get brands by country
  fastify.get("/by-country", controller.getBrandsByCountry);

  // GET /api/motorcycle-brands/:id - Get brand by ID
  fastify.get("/:id", controller.getBrandById);

  // POST /api/motorcycle-brands - Create new brand
  fastify.post("/", controller.createBrand);

  // PUT /api/motorcycle-brands/:id - Update brand
  fastify.put("/:id", controller.updateBrand);

  // DELETE /api/motorcycle-brands/:id - Delete brand
  fastify.delete("/:id", controller.deleteBrand);
}

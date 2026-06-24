import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import pinoPretty from "pino-pretty";
import databasePlugin from "./plugins/database";

import vehicleRoutes from "./entity/vehicle/vehicle.routes";

import ownerRoutes from "./owner/owner.routes";
import garageRoutes from "./entity/garage/garage.route";
import invoiceRoutes from "./entity/invoice/invoice.routes";
import brandRoutes from "./entity/brand/brand.routes";
import modelRoutes from "./entity/model/model.routes";
import correspondanceRoutes from "./entity/correspondance/routes";
import costRoutes from "./entity/cost/routes";
import partAndLaborRoutes from "./entity/partAndLabor/route";

dotenv.config();

// create directly pretty  stream
const prettyStream = pinoPretty({
  colorize: true,
  translateTime: "HH:MM:ss.l",
  ignore: "pid,hostname",
  levelFirst: false,
});

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    stream: prettyStream,
  },
});

// Register plugins
fastify.register(cors, {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
});

fastify.register(databasePlugin);

// Health check
fastify.get("/health", async () => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

//--------------------------------------------------------------------------------------------------------------------------

// Register all routes
fastify.register(ownerRoutes, { prefix: "/api/owners" });
fastify.register(vehicleRoutes, { prefix: "/api/vehicle" });
// fastify.register(taskRoutes, { prefix: "/api/task" });
// fastify.register(sparePartRoutes, { prefix: "/api/spare-part" });
fastify.register(garageRoutes, { prefix: "/api/garage" });
fastify.register(invoiceRoutes, { prefix: "/api/invoice" });
fastify.register(brandRoutes, { prefix: "/api/brand" });
fastify.register(modelRoutes, { prefix: "/api/model" });

fastify.register(correspondanceRoutes, { prefix: "/api/correspondance" });
fastify.register(costRoutes, { prefix: "/api/cost" });
fastify.register(partAndLaborRoutes, { prefix: "/api/part-and-labor" });
//--------------------------------------------------------------------------------------------------------------------------

// fastify.register(motorcycleBrandRoutes, { prefix: "/api/motorcycle-brands" });
// fastify.register(motorcycleModelRoutes, { prefix: "/api/motorcycle-models" });
// fastify.register(registrationRoutes, { prefix: "/api/registrations" });
// fastify.register(invoiceRoutes, { prefix: "/api/invoices" });
// fastify.register(laborRoutes, { prefix: "/api/labor" });
// fastify.register(consumableRoutes, { prefix: "/api/consumables" });

// // Add to routes registration
// fastify.register(rateConfigRoutes, { prefix: "/api/rate-config" });

// // Add to routes  for invoice header
// fastify.register(invoiceHeaderRoutes, { prefix: "/api/invoice-headers" });

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    success: false,
    error: `Route ${request.method}:${request.url} not found`,
  });
});

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  const statusCode =
    error && typeof error === "object" && "statusCode" in error ? (error as any).statusCode : 500;

  const errorMessage = error instanceof Error ? error.message : "Internal server error";

  reply.status(statusCode).send({
    success: false,
    error: errorMessage,
  });
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "3002");
    const host = process.env.HOST || "localhost";

    await fastify.listen({ port, host });

    fastify.log.info(`🚀 Server running on http://${host}:${port}`);
    fastify.log.info(`📋 Registered routes:`);
    fastify.log.info(fastify.printRoutes());
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

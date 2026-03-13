import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import databasePlugin from "./plugins/database";
import clientRoutes from "./routes/clients";
import motorcycleBrandRoutes from "./routes/motorcycleBrand.routes";
// Ajouter après les autres imports
import registrationRoutes from "./routes/registration.routes";
import laborRoutes from "./routes/labor.routes";
import consumableRoutes from "./routes/consumable.routes";
dotenv.config();

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// Register plugins
fastify.register(cors, {
  // origin: process.env.CLIENT_URL || "http://localhost:5173",
  origin: "*",
  credentials: true,
});

fastify.register(databasePlugin);

fastify.register(motorcycleBrandRoutes, { prefix: "/api/motorcycle-brands" });
// Ajouter après les autres registrations
fastify.register(registrationRoutes, { prefix: "/api/registrations" });
fastify.register(laborRoutes, { prefix: "/api/labor" });
fastify.register(consumableRoutes, { prefix: "/api/consumables" });
fastify.register(sparePartRoutes, { prefix: "/api/spare-parts" });
// Health check
fastify.get("/health", async () => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// ✅ NOUVELLE ROUTE: Récupérer la date courante de PostgreSQL
fastify.get("/api/current-date", async (request, reply) => {
  try {
    // Exécuter la requête SELECT CURRENT_DATE
    const result = await fastify.pg.query("SELECT CURRENT_DATE as current_date");

    return {
      success: true,
      data: {
        current_date: result.rows[0].current_date,
        server_time: new Date().toISOString(),
        database: process.env.DB_NAME || "tdc",
      },
      message: "Date retrieved successfully",
    };
  } catch (error) {
    fastify.log.error(error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    reply.status(500).send({
      success: false,
      error: "Failed to get current date from database",
      details: errorMessage,
    });
  }
});

// // Register routes
// fastify.register(clientRoutes, { prefix: "/api/clients" });

// // 404 handler
// fastify.setNotFoundHandler((request, reply) => {
//   reply.status(404).send({
//     success: false,
//     error: `Route ${request.method}:${request.url} not found`,
//   });
// });

// // Error handler - CORRIGÉ avec type guard
// fastify.setErrorHandler((error, request, reply) => {
//   fastify.log.error(error);

//   // Type guard pour gérer l'erreur de type 'unknown'
//   const statusCode =
//     error && typeof error === "object" && "statusCode" in error ? (error as any).statusCode : 500;

//   const errorMessage = error instanceof Error ? error.message : "Internal server error";

//   reply.status(statusCode).send({
//     success: false,
//     error: errorMessage,
//   });
// });

// Start server

async function start() {
  try {
    const port = parseInt(process.env.PORT || "3001");
    const host = process.env.HOST || "127.0.0.1";
    await fastify.listen({ port, host });
    fastify.log.info(`🚀 Server running on http://${host}:${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();

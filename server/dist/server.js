"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const database_1 = __importDefault(require("./plugins/database"));
const vehicle_routes_1 = __importDefault(require("./entity/vehicle/vehicle.routes"));
const owner_routes_1 = __importDefault(require("./owner/owner.routes"));
const garage_route_1 = __importDefault(require("./entity/garage/garage.route"));
const invoice_routes_1 = __importDefault(require("./entity/invoice/invoice.routes"));
const brand_routes_1 = __importDefault(require("./entity/brand/brand.routes"));
const model_routes_1 = __importDefault(require("./entity/model/model.routes"));
const routes_1 = __importDefault(require("./entity/correspondance/routes"));
const routes_2 = __importDefault(require("./entity/cost/routes"));
const route_1 = __importDefault(require("./entity/partAndLabor/route"));
dotenv_1.default.config();
// create directly pretty  stream
const prettyStream = (0, pino_pretty_1.default)({
    colorize: true,
    translateTime: "HH:MM:ss.l",
    ignore: "pid,hostname",
    levelFirst: false,
});
const fastify = (0, fastify_1.default)({
    logger: {
        level: process.env.NODE_ENV === "development" ? "debug" : "info",
        stream: prettyStream,
    },
});
// Register plugins
fastify.register(cors_1.default, {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
});
fastify.register(database_1.default);
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
fastify.register(owner_routes_1.default, { prefix: "/api/owners" });
fastify.register(vehicle_routes_1.default, { prefix: "/api/vehicle" });
// fastify.register(taskRoutes, { prefix: "/api/task" });
// fastify.register(sparePartRoutes, { prefix: "/api/spare-part" });
fastify.register(garage_route_1.default, { prefix: "/api/garage" });
fastify.register(invoice_routes_1.default, { prefix: "/api/invoice" });
fastify.register(brand_routes_1.default, { prefix: "/api/brand" });
fastify.register(model_routes_1.default, { prefix: "/api/model" });
fastify.register(routes_1.default, { prefix: "/api/correspondance" });
fastify.register(routes_2.default, { prefix: "/api/cost" });
fastify.register(route_1.default, { prefix: "/api/part-and-labor" });
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
    const statusCode = error && typeof error === "object" && "statusCode" in error ? error.statusCode : 500;
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
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();

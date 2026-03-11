import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { Pool } from "pg";

declare module "fastify" {
  interface FastifyInstance {
    pg: {
      pool: Pool;
      query: (text: string, params?: any[]) => Promise<any>;
    };
  }
}

async function databasePlugin(fastify: FastifyInstance) {
  const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // Test de connexion
  try {
    const client = await pool.connect();
    fastify.log.info("✅ PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    fastify.log.error("❌ PostgreSQL connection failed:");
    throw error;
  }

  // Décore fastify avec le pool et une méthode query
  fastify.decorate("pg", {
    pool,
    query: async (text: string, params?: any[]) => {
      const start = Date.now();
      try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        fastify.log.debug({ duration, text }, "Query executed");
        return res;
      } catch (error) {
        fastify.log.error({ text, error }, "Query failed");
        throw error;
      }
    },
  });

  // Créer la table clients si elle n'existe pas
  await fastify.pg.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      client_code VARCHAR(20) UNIQUE NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20) NOT NULL,
      address TEXT,
      city VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
    CREATE INDEX IF NOT EXISTS idx_clients_client_code ON clients(client_code);
  `);

  // Trigger pour mettre à jour updated_at
  await fastify.pg.query(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
    CREATE TRIGGER update_clients_updated_at
      BEFORE UPDATE ON clients
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  `);

  fastify.log.info("📦 Database schema initialized");
}

export default fastifyPlugin(databasePlugin);

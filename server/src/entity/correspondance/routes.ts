import { FastifyInstance } from "fastify";
import * as controller from "./controller";
import {
  CorrespondanceQueryParams,
  CreateCorrespondanceDto,
  UpdateCorrespondanceDto,
} from "./types";

export default async function correspondanceRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: CorrespondanceQueryParams }>("/", (request, reply) =>
    controller.getAllCorrespondances(fastify, request, reply),
  );
  fastify.get<{ Querystring: { subjectCode: string; code: string } }>("/lookup", (request, reply) =>
    controller.getCorrespondanceBySubjectAndCode(fastify, request, reply),
  );
  fastify.get<{ Params: { id: string } }>("/:id", (request, reply) =>
    controller.getCorrespondanceById(fastify, request, reply),
  );
  fastify.post<{ Body: CreateCorrespondanceDto }>("/", (request, reply) =>
    controller.createCorrespondance(fastify, request, reply),
  );

  fastify.put<{ Params: { id: string }; Body: UpdateCorrespondanceDto }>("/:id", (request, reply) =>
    controller.updateCorrespondance(fastify, request, reply),
  );
  fastify.delete<{ Params: { id: string } }>("/:id", (request, reply) =>
    controller.deleteCorrespondance(fastify, request, reply),
  );
  fastify.get<{ Params: { subjectCode: string } }>("/subject/:subjectCode", (request, reply) =>
    controller.getCorrespondanceBySubject(fastify, request, reply),
  );
}

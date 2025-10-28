import { FastifyInstance } from "fastify";
import { register } from "../controllers/orgs/register";

export function orgsRoutes(app: FastifyInstance){
  app.post('/orgs/register', register)
}
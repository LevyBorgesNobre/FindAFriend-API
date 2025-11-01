import { FastifyInstance } from "fastify";
import { register } from "../controllers/orgs/register";
import { authenticate } from "@/http/controllers/orgs/authenticate"

export function orgsRoutes(app: FastifyInstance){
  app.post('/orgs/register', register)
  app.post('/orgs/authenticate', authenticate)
}
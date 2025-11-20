import { FastifyInstance } from "fastify";
import { register } from "../controllers/orgs/register";
import { authenticate } from "@/http/controllers/orgs/authenticate"
import { profile } from "../controllers/orgs/profile";
import { verifyJWT } from "../middlewares/verifiy-jwt";

export function orgsRoutes(app: FastifyInstance){
  app.post('/orgs/register', register)
  app.post('/orgs/authenticate', authenticate)
  app.get('/orgs/profile',{
    preHandler:[verifyJWT]
  }, profile)
}   
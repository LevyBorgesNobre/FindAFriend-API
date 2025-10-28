import fastify from "fastify";
import { orgsRoutes } from "./http/routes/orgs-routes";

export const app = fastify()

app.register(orgsRoutes)
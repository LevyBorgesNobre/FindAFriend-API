import fastify from "fastify";
import { orgsRoutes } from "./http/routes/orgs-routes";
import { petsRoutes } from "./http/routes/pets-routes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})
app.register(orgsRoutes)
app.register(petsRoutes)
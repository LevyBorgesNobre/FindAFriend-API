import fastify from "fastify";
import { orgsRoutes } from "./http/routes/orgs-routes";
import { petsRoutes } from "./http/routes/pets-routes";

export const app = fastify()

app.register(orgsRoutes)
app.register(petsRoutes)
import { FastifyInstance } from "fastify";
import { create } from '@/http/controllers/pets/create'

 export function petsRoutes(app: FastifyInstance){
   app.post('/pets/:orgId/create', create)
 }
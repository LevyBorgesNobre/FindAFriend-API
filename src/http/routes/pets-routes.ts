import { FastifyInstance } from "fastify";
import { create } from '@/http/controllers/pets/create'
import { searchName } from "../controllers/pets/search-name";

 export function petsRoutes(app: FastifyInstance){
   app.post('/pets/:orgId/create', create)
   app.get('/pets/:name/search-name', searchName)
 }
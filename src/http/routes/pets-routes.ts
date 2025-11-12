import { FastifyInstance } from "fastify";
import { create } from '@/http/controllers/pets/create'
import { searchName } from "../controllers/pets/search-name";
import { searchByLocation } from "../controllers/pets/search-by-location";

 export function petsRoutes(app: FastifyInstance){
   app.post('/pets/:orgId/create', create)
   app.get('/pets/:name/search-name', searchName)
   app.get('/pets/:state/:city/search-location', searchByLocation)
 }
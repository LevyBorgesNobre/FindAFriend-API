import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePet } from "@/services/factories/make-create-pet";
import { makeGetCoordinates } from "@/services/factories/make-get-coordinates";
import z from 'zod'

export async function create( req: FastifyRequest, reply: FastifyReply){
   const createPetParamsSchema = z.object({
    orgId:z.string().uuid()
   })
   
   const createPetBodySchema = z.object({
    name:z.string().max(50, {message: "maximum characters for name exceeded"}),
    size:z.string().max(30, {message: "maximum characters for size exceeded"}),
    age: z.string().max(30, {message: "maximum characters for age exceeded"}),
   })

   const getCoordinatesSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
   })

   const { orgId } = createPetParamsSchema.parse(req.params)
   const { name, size, age} = createPetBodySchema.parse(req.body)
   const { latitude, longitude } = getCoordinatesSchema.parse(req.body)

    try {
        
       const createPet = makeCreatePet()
       const getCoordinates = makeGetCoordinates()

         const { city, state } = await getCoordinates.execute({
            latitude: latitude,
            longitude: longitude,
        })

       const { pet } = await createPet.execute({
            name:name,
            size:size,
            age: age,
            state:state,
            city:city,
            orgId: orgId
        })
      
        return reply.status(201).send(pet)
        
    } catch (error) {
        if (error){
            reply.status(400).send({message:`${error}`})
        }
    }
}
import { ResourceNotFoundError } from '@/services/erros/resource-not-found'
import { makeGetPetLocationUseCase } from '@/services/factories/make-get-pet-location-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function searchByLocation(req: FastifyRequest, reply: FastifyReply){
  const searchByLocationSchema = z.object({
    state: z.string().max(2, {message: "maximum characters for state exceeded"}),
    city:z.string().max(50, {message: "maximum characters for city exceeded"})
  })

  const {state, city} = searchByLocationSchema.parse(req.params)
  
  try {
    const searchByLocation = makeGetPetLocationUseCase()

    const petLocation = await searchByLocation.execute({
        state:state,
        city:city
    })

    reply.status(200).send(petLocation)

  } catch (error) {
      reply.status(404).send({message: `${error}`})
  }
}
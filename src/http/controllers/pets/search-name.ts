import { ResourceNotFoundError } from "@/services/erros/resource-not-found";
import { makeGetPetNameUseCase } from "@/services/factories/make-get-pet-name-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function searchName(req: FastifyRequest, reply: FastifyReply){
  const searchNameSchema = z.object({
    name: z.string().max(50, {message: "maximum characters for name exceeded"})
  })

  const { name } = searchNameSchema.parse(req.params)

  try {
    const searchName = makeGetPetNameUseCase()

   const pet = await searchName.execute({
     name: name
    })

    return reply.status(200).send(pet)

  } catch (error) {
    if(error){
        reply.status(404).send({message: `${error}`})
    }
  }
}
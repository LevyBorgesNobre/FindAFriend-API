import { makeGetOrgProfileUseCase } from "@/services/factories/make-get-org-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply){

  const getOrgProfile = makeGetOrgProfileUseCase()

  const { org } = await getOrgProfile.execute({
    id:req.user.sub
  })


  return reply.status(200).send({
    org:{
        ...org,
        password_hash:undefined
    }
   })
}
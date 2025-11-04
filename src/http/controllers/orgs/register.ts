import { email, z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateOrgUseCase } from "@/services/factories/make-create-org-use-case"
import { OrgAlreadyExistsError } from "@/services/erros/org-already-exists-error"

export async function register(req: FastifyRequest, reply: FastifyReply ){
    const registerOrgSchema = z.object({
        email: z.string().email(),
        password_hash: z.string().max(50, {message: "maximum characters for password exceeded"}),
        cep:z.string().max(20, {message: "maximum characters for cep exceeded"}),
        address: z.string().max(100, {message: "maximum characters for address exceeded"}),
        phone_number: z.string().max(20, {message: "maximum characters for phone number exceeded"}),
    })
   
const { email, password_hash, address, cep, phone_number} = registerOrgSchema.parse(req.body)
    
   try {
    const registerOrg = makeCreateOrgUseCase()
    await registerOrg.execute({
        email,
        password_hash,
        cep,
        address,
        phone_number,
    })
   } catch (error) {
    if (error instanceof OrgAlreadyExistsError){
        reply.status(409).send({message: `${error.message}`})
    }
   }
}
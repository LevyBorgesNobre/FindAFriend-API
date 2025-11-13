import { makeAuthenticateUseCase } from "@/services/factories/make-authenticate-use-case";
import { OrgInvalidCredentialsError } from "@/services/erros/org-invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
    const auithenticateOrgSchema = z.object({
        email:z.string().email(),
        password_hash:z.string().max(50, {message: "maximum characters for password exceeded"})
    })

    const { email, password_hash} = auithenticateOrgSchema.parse(req.body)

    try {
        const authenicateOrg = makeAuthenticateUseCase()

    const { org } = await authenicateOrg.execute({
            email,
            password_hash
        })

    const token = await reply.jwtSign({}, {
      sign:{
        sub: org.id
      }
    })

        return reply.status(200).send({token})
    } catch (error) {
        if (error instanceof OrgInvalidCredentialsError ){
            return reply.status(401).send({message: `${error.message}`})
        }
    }
}
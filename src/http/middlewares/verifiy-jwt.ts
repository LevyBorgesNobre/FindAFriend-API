import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";

export async function verifyJWT(req: FastifyRequest, reply: FastifyReply){
    try {
        await req.jwtVerify()
    } catch (error) {
        return reply.status(401).send({message: 'Unauthorized'})
    }
}
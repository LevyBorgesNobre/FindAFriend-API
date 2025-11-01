import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { AuthenticateUseCase } from "../use-cases/orgs/authenticate";

export function makeAuthenticateUseCase(){
    const orgRepository = new PrismaOrgRepository()
    const authenticateUseCase = new AuthenticateUseCase(orgRepository)

    return authenticateUseCase
}
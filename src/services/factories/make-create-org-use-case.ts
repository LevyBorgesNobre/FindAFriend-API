import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { RegisterUseCase } from "../use-cases/orgs/register";

export function makeCreateOrgUseCase(){
   const orgRepostory = new PrismaOrgRepository()
   const registerUseCase = new RegisterUseCase(orgRepostory)
   
   return registerUseCase

}
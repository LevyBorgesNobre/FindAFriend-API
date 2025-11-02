import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { GetOrgProfileUseCase } from "../use-cases/orgs/get-org-profile";


export function makeGetOrgProfileUseCase(){
   const orgRepository = new PrismaOrgRepository()
   const getOrgProfileUseCase = new GetOrgProfileUseCase(orgRepository)

   return getOrgProfileUseCase
}
import { prisma } from "@/lib/prisma"
import { Org, Prisma} from "@/generated/client"
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgRepository implements OrgsRepository {

  async create(data: Prisma.OrgCreateInput){
     const org = await prisma.org.create({
        data,
    })
    return org
  }
   
 async findById(id: string) {
    const orgId = await prisma.org.findUnique({
        where: {
            id,
        },
    })
    return orgId
  }

  async findByEmail(email: string){
     const orgEmail = await prisma.org.findUnique({
        where: {
            email,
        },
    })
    return orgEmail
  }
}
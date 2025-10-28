import { Prisma } from "../../generated/client";
import { Org } from "@/generated/client"


export class InMemoryOrgRepository {
     public orgs: Org[] = [];
     
     async create(data: Prisma.OrgCreateInput) {
          const org: Org = {
               id: crypto.randomUUID(),
               email: data.email,
               password_hash: data.password_hash,
               address: data.address,
               phone_number: data.phone_number,
               city: data.city,
               State: data.State,
               created_at: new Date(),
          }
          this.orgs.push(org)
     }
}
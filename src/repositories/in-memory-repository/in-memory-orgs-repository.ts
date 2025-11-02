import { Org, Prisma} from "@/generated/client"

export class InMemoryOrgRepository {
     public orgs: Org[] = [];
     
    async findById(id: string){
          const org = this.orgs.find((org=> org.id === id))
          
          if(!org){
               return null
          }

          return org
    }

     async findByEmail(email: string){
          const org = this.orgs.find((org=> org.email === email))

          if (!org){
               return null
          }

          return org
     }

     async create(data: Prisma.OrgCreateInput): Promise<Org>{
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
          return org
     }
}
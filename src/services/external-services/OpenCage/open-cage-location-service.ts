import { LocationService } from "./location-service";
import OpenCage from 'opencage-api-client'
import 'dotenv/config';
import { env } from "@/env";

interface GetLocation {
    state: string,
    city: string,
}

export class OpenCageLocationService implements LocationService{

      async getCoordinates(latitude: number, longitude: number): Promise<GetLocation>{

        try {
         const data = await OpenCage.geocode({
         q: `${latitude},${longitude}`,
         language: 'pt-BR',
         key: env.API_KEY
        });

        if (data.results.length === 0){
            throw new Error('Results not found.')
        }

            const comp = data.results[0].components
            const city = String(comp.city || comp.town || comp.village )
            const state = String(comp.state_code )

            return {
                city,
                state,
            }
        } catch (error) {
            throw new Error(`OpenCage: ${error}`)
        }
      
      }
        
}
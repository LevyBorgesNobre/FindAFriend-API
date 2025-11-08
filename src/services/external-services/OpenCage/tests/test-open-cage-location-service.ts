import { LocationService } from "../location-service"
 
 export class TestOpenCageLocationServices implements LocationService {
  async getCoordinates(latitude: number, longitude: number) {
    
    return {
      state: 'São Paulo',
      city: 'Campinas',
    }
  }
}
import { ResourceNotFoundError } from "@/services/erros/resource-not-found";
import { LocationService } from "@/services/external-services/OpenCage/location-service";

interface GetLocationCoordinatesUseCaseRequest{
    latitude: number,
    longitude: number,
}

interface GetLocationCoordinatesUseCaseResponse{
    state:string,
    city: string,
}

export class GetLocationCoordinatesUseCase{
    constructor(
        private locationService: LocationService
    ){}

   async execute({
    latitude,
    longitude,
    }:GetLocationCoordinatesUseCaseRequest): Promise<GetLocationCoordinatesUseCaseResponse>{

     if(
       typeof latitude !== 'number' ||
       typeof longitude !== 'number' ||
       isNaN(latitude) ||
       isNaN(longitude)
    ) {
      throw new ResourceNotFoundError()
    }
            
           const { state, city } = await this.locationService.getCoordinates(latitude, longitude)
            
            return {
                state,
                city,
            }
    }
}
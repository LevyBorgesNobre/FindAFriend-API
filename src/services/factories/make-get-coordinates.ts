import { OpenCageLocationService } from "../external-services/OpenCage/open-cage-location-service";
import { GetLocationCoordinatesUseCase } from "../use-cases/pets/get-location-coordinates";

export function makeGetCoordinates(){
  const serviceLocation = new OpenCageLocationService()
  const getLocationCoordinates = new GetLocationCoordinatesUseCase(serviceLocation)

  return getLocationCoordinates
}
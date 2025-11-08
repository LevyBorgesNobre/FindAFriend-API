export interface LocationService {
    getCoordinates(latitude: number, longitude: number): Promise<{
        state:string,
        city:string
    }>
}
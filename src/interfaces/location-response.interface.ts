import { LocationType } from "../enums/location-type.enum";

export interface LocationResponse {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    type: LocationType;
}
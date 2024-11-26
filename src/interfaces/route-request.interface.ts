import { RouteType } from "../enums/route-type.enum"

export interface RouteRequest {
    origin: RouteByCoordinates | RouteByRoom | RouteByLocationId;
    destination: RouteByCoordinates | RouteByRoom | RouteByLocationId;
}

interface RouteTarget {
    routeType: RouteType
}

interface RouteByCoordinates extends RouteTarget {
    latitude: number;
    longitude: number;
}

interface RouteByRoom extends RouteTarget {
    room: string;
}

interface RouteByLocationId extends RouteTarget {
    locationId: number;
}
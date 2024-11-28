import { RouteType } from "../enums/route-type.enum";

export interface RouteRequest {
  origin: RouteTarget;
  destination: RouteTarget;
}

export type RouteTarget = RouteByCoordinates | RouteByRoom | RouteByLocationId | null;

interface Route {
  routeType: RouteType;
}

interface RouteByCoordinates extends Route {
  latitude: number;
  longitude: number;
}

interface RouteByRoom extends Route {
  room: string;
}

interface RouteByLocationId extends Route {
  locationId: string;
}

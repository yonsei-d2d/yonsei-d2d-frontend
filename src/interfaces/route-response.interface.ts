export interface RouteResponse {
  path: RoutePath[];
  duration: number;
  distance: number;
  waypoints: RouteLocation[];
  guide: string[];
}

export interface RouteLocation {
  lat: number;
  lng: number;
  name: string;
  level: number;
}

export interface RoutePath {
  lat: number;
  lng: number;
}

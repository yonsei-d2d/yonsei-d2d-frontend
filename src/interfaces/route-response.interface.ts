export interface RouteResponse {
    path: String;
    duration: number;
    distance: number;
    waypoints: RouteLocation[];
    guide: string[];
}

interface RouteLocation {
    lat: number;
    lng: number;
    name: string;
    level: number;
}
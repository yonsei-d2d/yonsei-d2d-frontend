import { LocationResponse } from "./location-response.interface";
import { RouteResponse } from "./route-response.interface";

export interface AssistantResponse {
    answer: string;
    route?: RouteResponse,
    location?: LocationResponse,
}
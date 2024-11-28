import { createContext, useContext, useState } from 'react';
import { RouteResponse } from '../interfaces/route-response.interface';
import { RouteRequest, RouteTarget } from '../interfaces/route-request.interface';
import { MapMode } from '../enums/map-mode.enum';
import { LocationResponse } from '../interfaces/location-response.interface';

interface MapContextType {
  mapMode: MapMode;

  routeOrigin: RouteTarget;
  routeDestination: RouteTarget;

  routeResponse: RouteResponse | null;

  targetLocation: LocationResponse | null;

  assistantMessage: string | null;

  setMapMode: (mapMode: MapMode) => void;
  setRouteResponse: (data: RouteResponse | null) => void;

  setRouteOrigin: (input: RouteTarget) => void;
  setRouteDestination: (input: RouteTarget) => void;
  
  setTargetLocation: (data: LocationResponse | null) => void;

  setAssistantMessage: (data: string | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.NONE);

  const [routeOrigin, setRouteOrigin] = useState<RouteTarget>(null);
  const [routeDestination, setRouteDestination] = useState<RouteTarget>(null);
  const [routeResponse, setRouteResponse] = useState<RouteResponse | null>(null);

  const [assistantMessage, setAssistantMessage] = useState<string | null>(null);

  const [targetLocation, setTargetLocation] = useState<LocationResponse | null>(null);

  return (
    <MapContext.Provider value={{ assistantMessage, setAssistantMessage, targetLocation, setTargetLocation, mapMode, setMapMode, routeResponse, setRouteResponse, routeOrigin, setRouteOrigin, routeDestination, setRouteDestination }}>
      {children}
    </MapContext.Provider>
  );
};

export const useRouteMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};
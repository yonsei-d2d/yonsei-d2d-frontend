import { createContext, useContext, useState } from 'react';
import { RouteResponse } from '../interfaces/route-response.interface';
import { RouteRequest } from '../interfaces/route-request.interface';
import { MapMode } from '../enums/map-mode.enum';
import { LocationResponse } from '../interfaces/location-response.interface';

interface MapContextType {
  mapMode: MapMode;
  routeRequest: RouteRequest | null;
  routeResponse: RouteResponse | null;

  targetLocation: LocationResponse | null;

  setMapMode: (mapMode: MapMode) => void;
  setRouteResponse: (data: RouteResponse | null) => void;
  setRouteRequest: (data: RouteRequest | null) => void;
  setTargetLocation: (data: LocationResponse | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.NONE);

  const [routeResponse, setRouteResponse] = useState<RouteResponse | null>(null);
  const [routeRequest, setRouteRequest] = useState<RouteRequest | null>(null);

  const [targetLocation, setTargetLocation] = useState<LocationResponse | null>(null);

  return (
    <MapContext.Provider value={{ targetLocation, setTargetLocation, mapMode, setMapMode, routeResponse, setRouteResponse, routeRequest, setRouteRequest }}>
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
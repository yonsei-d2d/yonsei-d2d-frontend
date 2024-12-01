import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { useRouteMap } from "../../contexts/MapContext";
import { decode } from "@mapbox/polyline";
import { useEffect, useRef, useState } from "react";
import { MapMode } from "../../enums/map-mode.enum";
import L from "leaflet";
import markerIcon from "../../assets/images/marker.png";
import markerIcon2x from "../../assets/images/marker2x.png";
import markerShadow from "../../assets/images/marker-shadow.png";

const AntPath = require("leaflet-ant-path");

const MapWrapper = styled.div`
  width: 100%;
  height: 100dvh;
`;

interface MarkerProperties {
  latitude: number;
  longitude: number;
  popup?: string;
}

const CustomMarker = ({
  properties,
  icon,
}: {
  properties: MarkerProperties;
  icon: L.Icon;
}) => {
  let popupRef = useRef<any>(null);
  const map = useMap();

  useEffect(() => {
    if (popupRef.current) popupRef.current.openPopup();
  }, [popupRef, map]);

  return (
    <Marker
      ref={popupRef}
      icon={icon}
      position={[properties.latitude, properties.longitude]}
    >
      {properties.popup ? (
        <Popup autoClose={false} closeOnClick={false}>
          {properties.popup}
        </Popup>
      ) : (
        <></>
      )}
    </Marker>
  );
};

const RouteLayer = () => {
  const icon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [35, 35],
    iconAnchor: [16, 35],
    popupAnchor: [1, -34],
    shadowSize: [40, 40],
    shadowAnchor: [12, 40],
  });

  const { targetLocation, routeResponse, mapMode } = useRouteMap();

  const [markerList, setMarkerList] = useState<MarkerProperties[]>([]);

  const map = useMap();
  const routePolyLine = useRef<any>(null);

  const removePolyLine = () => {
    // Remove Polyline
    if (routePolyLine.current) map.removeLayer(routePolyLine.current);
  };

  const removeMarker = () => {
    // Remove Markers
    setMarkerList([]);
  };

  useEffect(() => {
    if (mapMode === MapMode.NONE) {
      removePolyLine();
      removeMarker();
    }

    if (mapMode === MapMode.MARKER && targetLocation) {
      removePolyLine();
      removeMarker();
      setMarkerList([
        {
          latitude: targetLocation.latitude,
          longitude: targetLocation.longitude,
          popup: targetLocation?.name,
        },
      ]);
      map.flyTo([targetLocation.latitude, targetLocation.longitude, 16]);
    }

    if (mapMode === MapMode.ROUTE && routeResponse) {
      removeMarker();
      const decodedPath = routeResponse.path.map((e) => [e.lat, e.lng]);

      setMarkerList(
        routeResponse.stopovers.map((e) => ({
          latitude: e.lat,
          longitude: e.lng,
          popup: e.name,
        }))
      );

      if (decodedPath.length > 0) {
        const origin = routeResponse.waypoints[0];
        map.flyTo([origin.lat, origin.lng, 16]);

        const antPolyline = AntPath.antPath(decodedPath, {
          options: {
            weight: 3,
            opacity: 0.8,
          },
          color: "#003876",
          pulseColor: "#ffffff",
          delay: 1000,
        });

        antPolyline.addTo(map);
        routePolyLine.current = antPolyline;
      }
    }
  }, [routeResponse, map, mapMode]);

  return (
    <>
      {markerList.map((e, i) => {
        return <CustomMarker key={i} icon={icon} properties={e}></CustomMarker>;
      })}
    </>
  );
};

const Map = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={[37.5650959, 126.9383306]}
        zoom={16}
        minZoom={16}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        maxBounds={L.latLngBounds(
          L.latLng(37.5507211, 126.9510584),
          L.latLng(37.5737023, 126.925849)
        )}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <RouteLayer />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;

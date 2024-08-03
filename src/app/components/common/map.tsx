"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapProvider } from "../providers/map-provider";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapZoom = 14;

const defaultMapOptions: google.maps.MapOptions = {
  zoomControl: true,
  tilt: 1,
};
const MapComponent = ({ lat, lng }: { lat: number; lng: number }) => {
  const defaultMapCenter = {
    lat,
    lng,
  };

  return (
    <MapProvider>
      <div className="w-full border bg-gray-300 h-full">
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={defaultMapCenter}
          zoom={defaultMapZoom}
          options={defaultMapOptions}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </div>
    </MapProvider>
  );
};

export { MapComponent };

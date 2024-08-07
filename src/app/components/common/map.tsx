"use client";
import React, { useCallback } from "react";
import { Map, useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import MapProvider from "../providers/map-provider";

type Poi = { lat: number; lng: number };

const PoiMarkers = ({ pois }: { pois: Poi }) => {
  const { lat, lng } = pois;
  const map = useMap();

  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("marker clicked: ", ev.latLng.toString());
    map.panTo(ev.latLng);
  }, []);

  return (
    <>
      <AdvancedMarker
        position={{
          lat,
          lng,
        }}
        clickable={true}
        onClick={handleClick}
      >
        <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>
    </>
  );
};
// ------------------------------------------
const MapComponent = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <MapProvider>
      <div className="w-full border bg-gray-300 h-full">
        <Map
          defaultZoom={14}
          defaultCenter={{ lat, lng }}
          mapId="da37f3254c6a6d1c"
        >
          <PoiMarkers pois={{ lat, lng }} />
        </Map>
      </div>
    </MapProvider>
  );
};

export { MapComponent };

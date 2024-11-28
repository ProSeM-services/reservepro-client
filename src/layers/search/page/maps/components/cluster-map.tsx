"use client";
import MapProvider from "@/components/providers/map-provider";
import { Map } from "@vis.gl/react-google-maps";

export function ClusterMap() {
  return (
    <MapProvider>
      <Map
        mapId={"bf51a910020fa25a"}
        defaultCenter={{ lat: 43.64, lng: -79.41 }}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        {/* {filteredTrees && <ClusteredTreeMarkers trees={filteredTrees} />} */}
      </Map>
    </MapProvider>
  );
}

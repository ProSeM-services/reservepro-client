import React from "react";
import { MapProvider } from "../providers/map-provider";
import { MapComponent } from "../common/map";
import { GeocodeServices } from "@/services/geocode.services";

export default async function DynamicMap({ address }: { address: string }) {
  const { lat, lng } = await GeocodeServices.getAdressGeocode(address);
  return (
    <MapProvider>
      <MapComponent lat={lat} lng={lng} />
    </MapProvider>
  );
}

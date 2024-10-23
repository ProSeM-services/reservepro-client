"use client";
import React, { useEffect, useState } from "react";
import { GeocodeServices } from "@/services/geocode.services";
import { MapComponent } from "@/components/common/map";

export function DynamicMap({ address }: { address: string }) {
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  useEffect(() => {
    const getLoaction = async () => {
      const location = await GeocodeServices.getAdressGeocode(address);
      setLocation(location);
    };
    getLoaction();
  }, [address]);

  return (
    <>
      {location?.lat && location.lng ? (
        <MapComponent lat={location.lat} lng={location.lng} />
      ) : null}
    </>
  );
}

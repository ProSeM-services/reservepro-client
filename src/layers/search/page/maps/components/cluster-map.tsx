"use client";
import MapProvider from "@/components/providers/map-provider";
import { Map } from "@vis.gl/react-google-maps";
import { ClusteredCompaniesMarkers } from "./cluster-tree-markers";
import { useEffect, useMemo, useState } from "react";
import { ICompanyMap } from "../utils";
import { ICompany } from "@/interfaces";
import { getClientComapnies } from "@/lib/clienta-actions";

export function ClusterMap() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("FALLO!");
          console.error("Error obteniendo la ubicación del usuario:", error);
          // Ubicación por defecto si no se obtiene la ubicación
          setUserLocation({ lat: 43.64, lng: -79.41 });
        }
      );
    } else {
      console.log("Geolocalización no soportada por el navegador.");
      setUserLocation({ lat: 43.64, lng: -79.41 });
    }
  }, []);
  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await getClientComapnies({
        category: "",
        city: "",
        query: "",
      });
      setCompanies(res);
    };
    fetchCompanies();
  }, []);

  const formatedCompanies: ICompanyMap[] = useMemo(
    () =>
      companies.map((company) => ({
        key: company.id,
        name: company.name,
        position: {
          lat: company.address.lat,
          lng: company.address.lng,
        },
        category: "Cejas y Pestañas",
      })),
    [companies]
  );

  if (!formatedCompanies && !userLocation) return;
  console.log(userLocation);
  return (
    <MapProvider>
      <Map
        mapId={"bf51a910020fa25a"}
        defaultCenter={userLocation || { lat: -38.7556381, lng: -62.2744032 }}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        {formatedCompanies && (
          <ClusteredCompaniesMarkers companies={formatedCompanies} />
        )}
      </Map>
    </MapProvider>
  );
}

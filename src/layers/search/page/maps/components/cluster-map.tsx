"use client";
import MapProvider from "@/components/providers/map-provider";
import { Map } from "@vis.gl/react-google-maps";
import { ClusteredCompaniesMarkers } from "./cluster-tree-markers";
import { useEffect, useMemo, useState } from "react";
import { ICompanyMap } from "../utils";
import { ICompany } from "@/interfaces";
import { getClientComapnies } from "@/lib/clienta-actions";
import { useSearchParams } from "next/navigation";

export function ClusterMap() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [zoom, setZoom] = useState(10);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  useEffect(() => {
    if (params.get("lat") && params.get("lng")) {
      setZoom(16);
      setUserLocation({
        lat: Number(params.get("lat") || ""),
        lng: Number(params.get("lng") || ""),
      });
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setZoom(10);
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
  }, [params.get("lat"), params.get("lng")]);
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
  return (
    <MapProvider>
      <Map
        mapId={"bf51a910020fa25a"}
        defaultCenter={userLocation || { lat: -38.7556381, lng: -62.2744032 }}
        defaultZoom={zoom}
        zoom={zoom}
        onZoomChanged={(e) => setZoom(e.detail.zoom)}
        gestureHandling={"greedy"}
        disableDefaultUI
        center={userLocation}
        onCenterChanged={(e) => setUserLocation(e.detail.center)}
      >
        {formatedCompanies && (
          <ClusteredCompaniesMarkers companies={formatedCompanies} />
        )}
      </Map>
    </MapProvider>
  );
}

import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { ICompanyMap } from "../utils";
import { TreeMarker } from "./tree-marker";
import CompanyCard from "@/layers/search/components/company-card";

export type ClusteredTreeMarkersProps = {
  companies: ICompanyMap[];
};

/**
 * The ClusteredTreeMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredCompaniesMarkers = ({
  companies,
}: ClusteredTreeMarkersProps) => {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [selectedTreeKey, setSelectedTreeKey] = useState<string | null>(null);

  const selectedTree = useMemo(
    () =>
      companies && selectedTreeKey
        ? companies.find((t) => t.key === selectedTreeKey)!
        : null,
    [companies, selectedTreeKey]
  );

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;

        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedTreeKey(null);
  }, []);

  const handleMarkerClick = useCallback((tree: ICompanyMap) => {
    setSelectedTreeKey(tree.key);
  }, []);

  return (
    <>
      {companies.map((tree) => (
        <TreeMarker
          key={tree.key}
          tree={tree}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedTreeKey && (
        <InfoWindow
          anchor={markers[selectedTreeKey]}
          onCloseClick={handleInfoWindowClose}
        >
          {selectedTree && <CompanyCard company={selectedTree?.company} />}
        </InfoWindow>
      )}
    </>
  );
};

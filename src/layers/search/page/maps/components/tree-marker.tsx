import { ICompanyMap } from "../utils/trees";
import type { Marker } from "@googlemaps/markerclusterer";
import React, { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { HouseIcon } from "lucide-react";

export type TreeMarkerProps = {
  tree: ICompanyMap;
  onClick: (tree: ICompanyMap) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

/**
 * Wrapper Component for an AdvancedMarker for a single tree.
 */
export const TreeMarker = (props: TreeMarkerProps) => {
  const { tree, onClick, setMarkerRef } = props;

  const handleClick = useCallback(() => onClick(tree), [onClick, tree]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, tree.key),
    [setMarkerRef, tree.key]
  );

  return (
    <AdvancedMarker position={tree.position} ref={ref} onClick={handleClick}>
      <HouseIcon className="bg-purple-700 rounded-lg  text-white p-1" />
    </AdvancedMarker>
  );
};

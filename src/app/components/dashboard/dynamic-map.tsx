"use client";
import React from "react";
export default function DynamicMap({ address }: { address: string }) {
  if (!process.env.NEXT_PUBLIC_APIMAPS) return null;
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_APIMAPS;
  const origin = address;
  const mapSrc = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(origin)}&mode=driving&zoom=14`;

  return (
    <iframe
      title="Google Maps Directions"
      id="gmap_canvas"
      className="h-full w-full"
      src={mapSrc}
    ></iframe>
  );
}

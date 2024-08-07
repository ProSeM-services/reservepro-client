"use client";
import React, { PropsWithChildren } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
export default function MapProvider({ children }: PropsWithChildren) {
  return (
    <APIProvider
      apiKey={"AIzaSyCGrmoTv25OSCei91GozzCa0GxRheQ2xOc"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      {children}
    </APIProvider>
  );
}

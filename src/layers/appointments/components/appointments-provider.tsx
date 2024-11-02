"use client";
import { ReactNode } from "react";

interface AppointmentProviderProps {
  children: ReactNode;
}
export function AppointmentProvider({ children }: AppointmentProviderProps) {
  return <div>{children}</div>;
}

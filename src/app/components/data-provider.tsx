"use client";
import { setAuthInterceptor } from "@/config/axios.config";
import { useSession } from "next-auth/react";
import React, { Fragment, PropsWithChildren, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";

export default function DataProvider({ children }: PropsWithChildren) {
  const session = useSession();
  const {
    fetchCompanies,
    fetchMembers,
    fetchCustomers,
    fetchServices,
    fetchAppointments,
  } = useFetchData();
  useEffect(() => {
    if (!session.data || !session.data?.backendTokens?.accessToken) return;
    // console.log(`  --------------- \n DataProvider () \n ---------------  `);
    const fetchData = async () => {
      try {
        await setAuthInterceptor(session.data?.backendTokens.accessToken);
        fetchCompanies();
        fetchMembers();
        fetchCustomers();
        fetchServices();
        fetchAppointments();
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, [session.data]);
  return <Fragment>{children}</Fragment>;
}

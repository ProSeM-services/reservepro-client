"use client";
import { setAuthInterceptor } from "@/config/axios.config";
import { useSession } from "next-auth/react";
import React, { Fragment, PropsWithChildren, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { useAppSelector } from "@/store/hooks";

export default function DataProvider({ children }: PropsWithChildren) {
  const session = useSession();
  const {
    fetchCompanies,
    fetchMembers,
    fetchCustomers,
    fetchServices,
    fetchAppointments,
    fetchMemberLogged,
  } = useFetchData();

  const { fetched: companyFetched } = useAppSelector((s) => s.company);
  const { fetched: membersFetched } = useAppSelector((s) => s.member);
  const { fetched: customerFetched } = useAppSelector((s) => s.customers);
  const { fetched: servicesFetched } = useAppSelector((s) => s.service);
  const { fetched: appointmentsFetched } = useAppSelector(
    (s) => s.appointments
  );

  useEffect(() => {
    if (!session.data || !session.data?.backendTokens?.accessToken) return;
    const fetchData = async () => {
      try {
        await setAuthInterceptor(session.data?.backendTokens.accessToken);
        !companyFetched && fetchCompanies();
        !membersFetched && fetchMembers();
        !customerFetched && fetchCustomers();
        !servicesFetched && fetchServices();
        !appointmentsFetched && fetchAppointments();
        !membersFetched && fetchMemberLogged(session.data.user.id);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, [session.data]);
  return <Fragment>{children}</Fragment>;
}

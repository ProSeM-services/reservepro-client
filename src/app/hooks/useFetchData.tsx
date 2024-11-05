"use client";
import { AppointmentServices } from "@/services/appointment.services";
import { CompanyServices } from "@/services/company.services";
import { CustomerServices } from "@/services/customer.services";
import { MemberServices } from "@/services/member.services";
import { ServicesServices } from "@/services/services.services";
import {
  setAppointments,
  toggleAppointmentsLoading,
} from "@/store/feature/appointnments/appointmentsSlice";
import {
  setCompanies,
  toggleCompanyLoading,
} from "@/store/feature/company/companySlice";
import {
  setCustomers,
  toggleCustomersLoading,
} from "@/store/feature/customers/customerSlice";
import {
  setMembers,
  toggleMembersLoading,
} from "@/store/feature/members/membersSlice";
import {
  setServices,
  toggleServiceLoading,
} from "@/store/feature/services/servicesSlice";
import { useAppDispatch } from "@/store/hooks";

export default function useFetchData() {
  const dispatch = useAppDispatch();
  const fetchCompanies = async () => {
    try {
      dispatch(toggleCompanyLoading(true));
      const companies = await CompanyServices.getCompanies();
      dispatch(setCompanies(companies));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleCompanyLoading(false));
    }
  };
  const fetchMembers = async () => {
    try {
      dispatch(toggleMembersLoading(true));
      const members = await MemberServices.getMembers();
      dispatch(setMembers(members));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleMembersLoading(false));
    }
  };
  const fetchServices = async () => {
    try {
      dispatch(toggleServiceLoading(true));
      const services = await ServicesServices.getAll();
      dispatch(setServices(services));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleServiceLoading(false));
    }
  };
  const fetchCustomers = async () => {
    try {
      dispatch(toggleCustomersLoading(true));
      const customers = await CustomerServices.getAll();
      dispatch(setCustomers(customers));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleCustomersLoading(false));
    }
  };
  const fetchAppointments = async () => {
    try {
      dispatch(toggleAppointmentsLoading(true));
      const appointments = await AppointmentServices.getAll();
      dispatch(setAppointments(appointments));
    } catch (error) {
      console.log("Error fetching Companies", error);
    } finally {
      dispatch(toggleAppointmentsLoading(false));
    }
  };
  return {
    fetchCompanies,
    fetchMembers,
    fetchCustomers,
    fetchServices,
    fetchAppointments,
  };
}

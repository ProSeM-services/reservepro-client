"use client";
import { ICompany, ICreateCompany } from "@/interfaces";
import { ICreateMember } from "@/interfaces/member.iterface";
import { CompanyServices } from "@/services/company.services";
import { MemberServices } from "@/services/member.services";
import { addCompany } from "@/store/feature/company/companySlice";
import { addMember } from "@/store/feature/members/membersSlice";
import { useAppDispatch } from "@/store/hooks";

export default function useCreatingFetch() {
  const dispatch = useAppDispatch();
  const createCompany = async (data: ICreateCompany) => {
    try {
      //   dispatch(toggleCompanyLoading(true));
      const newCompany = await CompanyServices.createcompany(data);
      dispatch(addCompany(newCompany));
    } catch (error) {
      console.log("Error creating Companies", error);
    } finally {
      //   dispatch(toggleCompanyLoading(false));
    }
  };
  const createMember = async (data: ICreateMember) => {
    try {
      //   dispatch(toggleMembersLoading(true));
      const newMember = await MemberServices.createMember(data);
      dispatch(addMember(newMember));
    } catch (error) {
      console.log("Error creating Companies", error);
    } finally {
      //   dispatch(toggleMembersLoading(false));
    }
  };
  return { createCompany, createMember };
}

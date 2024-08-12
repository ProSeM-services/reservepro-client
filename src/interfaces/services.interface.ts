import { z } from "zod";
import { MemberZodSchema } from "./member.iterface";

export const PROVISION_VALUES = [
  "Presencial",
  "Online",
  "A Domicilio",
] as const;
export type Provision = (typeof PROVISION_VALUES)[number];

export const ServiceZodSchema = z.object({
  _id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number(),
  duration: z.number(),
  provision: z.enum(PROVISION_VALUES),
  members: z.array(MemberZodSchema),
  companyId: z.string().optional(),
});

export const CreateServiceZodSchema = ServiceZodSchema.omit({
  _id: true,
  members: true,
  companyId: true,
});
export const UpdateServiceZodSchema = ServiceZodSchema.omit({
  _id: true,
  members: true,
}).partial();

export type IService = z.infer<typeof ServiceZodSchema>;
export type ICreateService = z.infer<typeof CreateServiceZodSchema>;
export type IUpdateService = z.infer<typeof UpdateServiceZodSchema>;
export const AddServiceToCompanySchema = z.object({
  companyId: z.string().min(1),
  serviceId: z.string().min(1),
});

export const AddServiceSchema = z.object({
  companyId: z.string(),
  serviceId: z.string(),
});
export const AddMemberToService = z.object({
  serviceId: z.string(),
  memberId: z.string(),
});
export type IAddMemberToService = z.infer<typeof AddMemberToService>;
export type IAddService = z.infer<typeof AddServiceSchema>;

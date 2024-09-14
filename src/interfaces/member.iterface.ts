import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";

export const ROLES_VALUES = ["BASIC", "ADMIN"] as const;

export type Role = (typeof ROLES_VALUES)[number];
export const ZodTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES_VALUES),
  userName: z.string(),
  password: z.string(),
  tenantName: z.string().optional(),
  companyName: z.string(),
  image: z.string().optional(),
});
export const CreateTenantZodSchema = ZodTenantSchema.omit({
  id: true,
});
export type ITentant = z.infer<typeof ZodTenantSchema>;
export type ICreateTentant = z.infer<typeof CreateTenantZodSchema>;

export const MemberZodSchema = ZodTenantSchema.omit({
  tenantName: true,
}).extend({
  phone: z.string().optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
});
export const CreateMemberZodSchema = ZodTenantSchema.omit({
  tenantName: true,
  id: true,
}).extend({
  phone: z.string().optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
});
export const UpdateMemberZodSchema = ZodTenantSchema.omit({
  tenantName: true,
})
  .partial()
  .extend({
    phone: z.string().optional(),
    workhours: z.array(WorkhourZodSchema).optional(),
  });

export type IMember = z.infer<typeof MemberZodSchema>;
export type ICreateMember = z.infer<typeof CreateMemberZodSchema>;

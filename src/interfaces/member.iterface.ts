import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";

export const ROLES_VALUES = ["BASIC", "ADMIN"] as const;

export type Role = (typeof ROLES_VALUES)[number];
export const ZodTenantSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES_VALUES),
  userName: z.string(),
  password: z.string(),
  tenantName: z.string(),
  image: z.string().optional(),
});
export type ITentant = z.infer<typeof ZodTenantSchema>;

export const MemberZodSchema = ZodTenantSchema.omit({
  tenantName: true,
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

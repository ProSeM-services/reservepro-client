import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";
import { CATEGORY_VALUES } from "./categeory.interface";
import { LocationZodSchema } from "./location.interface";
import { MemberZodSchema } from "./member.iterface";

export const CompanyZodSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  address: LocationZodSchema,
  status: z.boolean().optional(),
  category: z
    .array(z.enum(CATEGORY_VALUES))
    .max(3, "Puedes elegir como máximo 3 categorías.")
    .min(1, "Debes elegir por lo menos 1 categoría."),
  image: z.string().optional(),
  email: z.string().email("Correo electrónico no válido").optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
  members: z.array(MemberZodSchema).optional(),
});
export const CreateCompanyZodSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  address: z.string(),
  status: z.boolean().optional(),
  category: z
    .array(z.enum(CATEGORY_VALUES))
    .max(3, "Puedes elegir como máximo 3 categorías.")
    .min(1, "Debes elegir por lo menos 1 categoría."),
  image: z.string().optional(),
  email: z.string().email("Correo electrónico no válido").optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
});

export type ICompany = z.infer<typeof CompanyZodSchema>;
export type ICreateCompany = z.infer<typeof CreateCompanyZodSchema>;

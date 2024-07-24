import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";

export const CompanyZodSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  address: z.string(),
  coin: z.string(),
  status: z.boolean().optional(),
  services: z.array(z.string()),
  category: z.array(z.string()),
  image: z.string().optional(),
  email: z.string().optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
});

export type ICompany = z.infer<typeof CompanyZodSchema>;

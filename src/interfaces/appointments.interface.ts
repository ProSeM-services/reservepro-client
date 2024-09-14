import { z } from "zod";
import { MemberZodSchema } from "./member.iterface";
const isoStringRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;
export const AppointmentZodSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  time: z.string().min(1),
  memberId: z.string().min(1),
  canceled: z.boolean(),
  date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  member: MemberZodSchema,
  duration: z.number(),
  serviceId: z.string().min(1),
  createdAt: z.string(),
});

export const SlotsZodSchmea = z.object({
  date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  memberId: z.string().min(1),
});
export const CancelAppointmentZodSchema = z.object({
  appointmemntId: z.string(),
});

export type IAppointment = z.infer<typeof AppointmentZodSchema>;

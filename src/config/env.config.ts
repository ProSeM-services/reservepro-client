import { z } from "zod";

const envZodModel = z.object({
  NEXT_PUBLIC_API: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  NEXT_PUBLIC_APIMAPS: z.string(),
});

/*
 |TODO For the moment prevent this from passing deployment into production.
 |------>  envZodModel.parse(process.env);
*/

type EnvType = z.infer<typeof envZodModel>;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvType {}
  }
}

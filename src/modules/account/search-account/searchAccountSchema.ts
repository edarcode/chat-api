import { z } from "zod";
import { emailSchema } from "../../../zod-schemas/emailSchema";

export const searchAccountSchema = z
  .object({
    email: emailSchema,
  })
  .strict();

export type SearchAccount = z.infer<typeof searchAccountSchema>;

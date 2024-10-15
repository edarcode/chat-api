import { z } from "zod";

export const saveMsgSchema = z
  .object({
    text: z.string(),
  })
  .strict();

export type SaveMsg = z.infer<typeof saveMsgSchema>;

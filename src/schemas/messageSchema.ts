import { z } from "zod";

export const messageSchema = z.object({
  context: z.string().min(10, "Content should be at least 10 characters"),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

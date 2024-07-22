import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "Username should be more than 2 characters")
  .max(20, "Username should not be more than 20 characters")
  .regex(/^[a-zA-Z0-9 ]*$/, "No Special Character Allowed");

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "Password should be more than 6 characters" }),
});

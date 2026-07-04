import { password } from "bun";
import { email, string, z } from "zod";

const passWordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^A-Za-z0-9]/, "Must contain a special character");

export const userData = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: passWordSchema,
});

export const signin = z.object({
  email: z.email(),
  password: passWordSchema,
});

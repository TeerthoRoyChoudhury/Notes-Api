import { z } from "zod";

export const notesData = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().max(500).optional(),
});

export const paramId = z.uuid();

export const updateValidator = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  })
  .refine((data) => {
    return (
      data.content || data.title,
      {
        message: "Atleast one field must be provided",
      }
    );
  });

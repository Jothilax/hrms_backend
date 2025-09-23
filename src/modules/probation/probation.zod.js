import { z } from "zod";

const uuid = z.uuid("Invalid UUID format");
const date = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format (YYYY-MM-DD)" });

// CREATE
export const createProbationSchema = z.object({
  body: z.object({
    emp_id: uuid,
    start_date: date,
    end_date: date,
    status: z.enum(["active", "completed", "terminated"]).default("active"),
    remarks: z.string().optional(),
    created_by: uuid.optional(),
    updated_by: z.string().optional(),
  }).refine(
    (data) => new Date(data.end_date) > new Date(data.start_date),
    { message: "End date must be after start date", path: ["end_date"] }
  ),
});

// UPDATE
export const updateProbationSchema = z.object({
  params: z.object({
    prob_id: uuid,
  }),
  body: z.object({
    emp_id: uuid.optional(),
    start_date: date.optional(),
    end_date: date.optional(),
    status: z.enum(["active", "completed", "terminated"]).optional(),
    remarks: z.string().optional(),
    updated_by: z.string().optional(),
  }).refine(
    (data) =>
      !data.start_date || !data.end_date || new Date(data.end_date) > new Date(data.start_date),
    { message: "End date must be after start date", path: ["end_date"] }
  ),
});

// DELETE
export const deleteProbationSchema = z.object({
  params: z.object({
    prob_id: uuid,
  }),
});

// GET BY ID
export const getProbationByIdSchema = z.object({
  params: z.object({
    prob_id: uuid,
  }),
});

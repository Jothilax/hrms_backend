import { z } from "zod";

// ✅ Create Division Schema
export const createDivisionSchema = z.object({
  body: z.object({
    division_name: z.string().min(3, "Division name must be at least 3 characters"),
    role_id: z.string().uuid("Invalid role ID format"),
    is_active: z.boolean().optional().default(true),
    created_by: z.string().uuid().optional(),
    updated_by: z.string().uuid().optional(),
  }),
});

// ✅ Update Division Schema
export const updateDivisionSchema = z.object({
  body: z.object({
    division_name: z.string().min(3).optional(),
    role_id: z.string().uuid().optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().uuid().optional(),
    updated_by: z.string().uuid().optional(),
  }),
});

// ✅ ID Validation Schema
export const idSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid division ID format"),
  }),
});

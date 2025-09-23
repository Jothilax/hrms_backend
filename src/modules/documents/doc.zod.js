import { z } from "zod";

export const createDocumentSchema = z.object({
  // these are metadata fields (if any)
  emp_id: z.string().uuid(),   // 👈 add this line
  created_by: z.string().min(1).optional(),
  remarks: z.string().max(2000).optional(),
  // status shouldn't be set by client typically; if provided, validate
  status: z.enum(["pending","verified","rejected"]).optional()
});

export const updateDocumentSchema = z.object({
  updated_by: z.string().optional(),
  remarks: z.string().max(2000).optional(),
  status: z.enum(["pending","verified","rejected"]).optional()
});

import { z } from "zod";

// ----------------- CREATE -----------------
export const createEducationSchema = z.object({
  body: z.object({
    emp_id: z.string().uuid(),
    educations: z.array(
      z.object({
        qualification: z.string().max(100),
        specialization: z.string().max(100).optional().nullable(),
        institution: z.string().max(150),
        university: z.string().max(150),
        start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
        end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
        percentage: z.string().max(10).optional().nullable(),
        certifications: z.string().optional().nullable(),
        document_url: z.string().url().optional().nullable(),
      })
    ).min(1, "At least one education detail required"),
    created_by: z.string().optional(),
  }),
});


// ----------------- UPDATE -----------------
export const updateEducationSchema = z.object({
  body: z.object({
    qualification: z.string().max(100).optional(),
    specialization: z.string().max(100).optional().nullable(),
    institution: z.string().max(150).optional(),
    university: z.string().max(150).optional(),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
    percentage: z.string().max(10).optional().nullable(),
    certifications: z.string().optional().nullable(),
    document_url: z.string().url().optional().nullable(),
    updated_by: z.string().optional(),
  }),
  params: z.object({
    edu_id: z.string().uuid(),
  }),
});

// ----------------- GET LIST -----------------
export const getEducationSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    orderBy: z.string().optional().default("createdAt"),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
  }),
});

// ----------------- GET BY ID -----------------
export const getEducationByIdSchema = z.object({
  params: z.object({
    edu_id: z.string().uuid(),
  }),
});

// ----------------- DELETE -----------------
export const deleteEducationSchema = z.object({
  params: z.object({
    edu_id: z.string().uuid(),
  }),
});

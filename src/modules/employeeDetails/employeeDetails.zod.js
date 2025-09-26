import { z } from "zod";

const genderEnum = z.enum(["Male", "Female", "Other"]);
const maritalEnum = z.enum(["Single", "Married", "Divorced", "Widowed"]);

// ✅ CREATE
export const createEmpDetailsSchema = z.object({
  body: z.object({
    emp_id: z.uuid(),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    gender: genderEnum.optional(),
    marital_status: maritalEnum.optional(),
    blood_group: z.string().max(5).optional(),
    nationality: z.string().max(50).optional(),

    // // Contact Info
    // permanent_address: z.string().min(1),
    // current_address: z.string().min(1),
    // city: z.string().min(1),
    // state: z.string().min(1),
    // zip_code: z.string().min(1),
    // mobile_number: z.string().min(10).max(15),
    // email: z.email(),

    // // Government & Legal
    // pan_number: z.string().min(5),
    // aadhar_number: z.string().min(5),
    // pf_number: z.string().min(5),
    // esi_number: z.string().min(5),
    // tax_category: z.string().min(1),
    // tds_info: z.string().min(1),

    // // Emergency Contact
    // emergency_contact_name: z.string().min(1),
    // emergency_contact_relation: z.string().min(1),
    // emergency_contact_phone: z.string().min(10).max(15),
    // emergency_contact_address: z.string().min(1),

    // // HRMS Core
    // is_active: z.boolean().optional(),
    // created_by: z.uuid().optional(),

    
    permanent_address: z.string().min(1).optional(),
    current_address: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    state: z.string().min(1).optional(),
    zip_code: z.string().min(1).optional(),
    mobile_number: z.string().min(10).max(15).optional(),
    email: z.string().email().optional(),
    
    pan_number: z.string().min(5).optional(),
    aadhar_number: z.string().min(5).optional(),
    pf_number: z.string().min(5).optional(),
    esi_number: z.string().min(5).optional(),
    tax_category: z.string().min(1).optional(),
    tds_info: z.string().min(1).optional(),
    
    emergency_contact_name: z.string().min(1).optional(),
    emergency_contact_relation: z.string().min(1).optional(),
    emergency_contact_phone: z.string().min(10).max(15).optional(),
    emergency_contact_address: z.string().min(1).optional(),
    
  }),
});

// ✅ UPDATE
export const updateEmpDetailsSchema = z.object({
  params: z.object({
    personal_id: z.uuid(),
  }),
  body: createEmpDetailsSchema.shape.body.partial().extend({
    updated_by: z.string().optional(),
  }),
});

// ✅ GET BY ID
export const getEmpDetailsByIdSchema = z.object({
  params: z.object({
    personal_id: z.uuid(),
  }),
});

// ✅ DELETE
export const deleteEmpDetailsSchema = z.object({
  params: z.object({
    personal_id: z.uuid(),
  }),
});

// ✅ LIST / GET ALL
export const getEmpDetailsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
    orderBy: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
    includeInactive: z.enum(["true", "false"]).optional(),
  }),
});

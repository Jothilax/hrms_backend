import { z } from "zod";

// Reusable enums
const employeeTypeEnum = z.enum(["Permanent", "Contract", "Intern"]);
const statusEnum = z.enum(["Active", "Inactive", "New Employee"]);

// // ----------------- CREATE -----------------
// export const createEmployeeSchema = z.object({
//   body: z.object({
//     emp_no: z.string().max(20).optional(),
//     attendance_id: z.string().max(20),
//     emp_fname: z.string().max(100),
//     emp_lname: z.string().max(100),
//     role_id: z.uuid().optional().nullable(),
//     dept_id: z.uuid().optional().nullable(),
//     branch_id: z.uuid().optional().nullable(),
//     doj: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
//     reporting_manager: z.string().uuid().optional().nullable(),
//     employee_type: employeeTypeEnum.optional().default("Permanent"),
//     shift_hours: z.string().max(50).optional().nullable(),
//     // profile_img: z.url().optional().nullable(),
//     profile_img: z
//   .string()
//   .trim()
//   .url({ message: "Invalid URL format" })
//   .optional()
//   .or(z.literal("")),

//     is_active: z.boolean().optional(),
//     status: statusEnum.optional().default("Active"),
//     created_by: z.string().optional(),
//   }),
// });

// // ----------------- UPDATE -----------------
// export const updateEmployeeSchema = z.object({
//   body: z.object({
//     attendance_id: z.string().max(20).optional(),
//     emp_fname: z.string().max(100).optional(),
//     emp_lname: z.string().max(100).optional(),
//     role_id: z.uuid().optional().nullable(),
//     dept_id: z.uuid().optional().nullable(),
//     branch_id: z.uuid().optional().nullable(),
//     doj: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
//     reporting_manager: z.uuid().optional().nullable(),
//     employee_type: employeeTypeEnum.optional(),
//     shift_hours: z.string().max(50).optional().nullable(),
//     // profile_img: z.url().optional().nullable(),
//     profile_img: z
//   .string()
//   .trim()
//   .url({ message: "Invalid URL format" })
//   .optional()
//   .or(z.literal("")),

//     is_active: z.boolean().optional(),
//     status: statusEnum.optional(),
//     updated_by: z.string().optional(),
//   }),
//   params: z.object({
//     emp_id: z.string().uuid(),
//   }),
// });




// ----------------- CREATE -----------------
export const createEmployeeSchema = z.object({
  body: z.object({
    emp_no: z.string().max(36).optional(),
    attendance_id: z.string().max(36).optional(), // <--- make optional
    emp_fname: z.string().max(100),
    emp_lname: z.string().max(100),
    role_id: z.string().uuid().optional().nullable(),
    dept_id: z.string().uuid().optional().nullable(),
    branch_id: z.string().uuid().optional().nullable(),
    doj: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
    reporting_manager: z.string().uuid().optional().nullable(),
    employee_type: employeeTypeEnum.optional().default("Permanent"),
    shift_hours: z.string().max(50).optional().nullable(),
    profile_img: z.string().optional().nullable(),  // ✅ updated
    is_active: z.boolean().optional(),
    status: statusEnum.optional().default("Active"),
    created_by: z.string().optional(),
  }),
});

// ----------------- UPDATE -----------------
export const updateEmployeeSchema = z.object({
  body: z.object({
    attendance_id: z.string().max(36).optional(),
    emp_fname: z.string().max(100).optional(),
    emp_lname: z.string().max(100).optional(),
    role_id: z.string().uuid().optional().nullable(),
    dept_id: z.string().uuid().optional().nullable(),
    branch_id: z.string().uuid().optional().nullable(),
    doj: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    reporting_manager: z.string().uuid().optional().nullable(),
    employee_type: employeeTypeEnum.optional(),
    shift_hours: z.string().max(50).optional().nullable(),
    profile_img: z.string().optional().nullable(),  // ✅ updated
    is_active: z.boolean().optional(),
    status: statusEnum.optional(),
    updated_by: z.string().optional(),
  }),
  params: z.object({
    emp_id: z.string().uuid(),
  }),
});


// ----------------- GET LIST (query params) -----------------
export const getEmployeeSchema = z.object({
  query: z.object({
    emp_id: z.uuid().optional(),
    includeInactive: z.enum(["true", "false"]).transform(v => v === "true").optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    orderBy: z.string().optional().default("createdAt"),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
  }),
});

// ----------------- GET BY ID -----------------
export const getEmployeeByIdSchema = z.object({
  params: z.object({
    emp_id: z.uuid(),
  }),
});

// ----------------- DELETE -----------------
export const deleteEmployeeSchema = z.object({
  params: z.object({
    emp_id: z.uuid(),
  }),
});
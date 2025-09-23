import { z } from "zod";

// ✅ Common date validator
const dateValidator = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" });

// CREATE
export const createEmployeeSchema = z.object({
  body: z.object({
    emp_no: z.string().min(1, "Employee number is required").max(20, "Max 20 chars"),
    emp_fname: z.string().min(1, "First name is required").max(50, "Max 50 chars"),
    emp_lname: z.string().min(1, "Last name is required").max(50, "Max 50 chars"),
    email: z.email("Invalid email").max(50, "Max 50 chars"),
    password: z.string().min(6, "Password must be at least 6 characters"), // since allowNull:false
    phone_no: z.string().regex(/^\d{10,15}$/, "Phone number must be 10–15 digits"),
    dob: dateValidator,
    doj: dateValidator,
    designation: z.uuid("Invalid designation ID"),
    address1: z.string().min(1, "Address required").max(200),
    address2: z.string().max(200).nullable().optional(),
    city: z.string().min(1, "City required").max(100),
    state: z.string().min(1, "State required").max(100),
    country: z.string().min(1, "Country required").max(100),
    pincode: z.string().regex(/^\d{4,10}$/, "Pincode must be 4–10 digits"), // model allows 10 chars
    division: z.uuid("Invalid division ID"),
    department: z.uuid("Invalid department ID"),
    branch: z.uuid("Invalid branch ID"),
    asset_allocation: z.uuid("Invalid asset allocation ID").nullable().optional(),
    is_active: z.boolean().optional().default(true), // defaults to true in model
  }),
});

// UPDATE
export const updateEmployeeSchema = z.object({
  params: z.object({
    emp_id: z.string().uuid("Invalid employee ID"),
  }),
  body: z.object({
    emp_no: z.string().max(20).optional(),
    emp_fname: z.string().max(50).optional(),
    emp_lname: z.string().max(50).optional(),
    email: z.string().email().max(50).optional(),
    password: z.string().min(6).optional(),
    phone_no: z.string().regex(/^\d{10,15}$/, "Phone number must be 10–15 digits").optional(),
    dob: dateValidator.optional(),
    doj: dateValidator.optional(),
    designation: z.string().uuid("Invalid designation ID").optional(),
    address1: z.string().max(200).optional(),
    address2: z.string().max(200).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    pincode: z.string().regex(/^\d{4,10}$/, "Pincode must be 4–10 digits").optional(),
    division: z.string().uuid("Invalid division ID").optional(),
    department: z.string().uuid("Invalid department ID").optional(),
    branch: z.string().uuid("Invalid branch ID").optional(),
    asset_allocation: z.string().uuid("Invalid asset allocation ID").nullable().optional(),
    is_active: z.boolean().optional(),
  }),
});

// DELETE
export const deleteEmployeeSchema = z.object({
  params: z.object({
    emp_id: z.string().uuid("Invalid employee ID"),
  }),
});

// GET BY ID
export const getEmployeeByIdSchema = z.object({
  params: z.object({
    emp_id: z.string().uuid("Invalid employee ID"),
  }),
});

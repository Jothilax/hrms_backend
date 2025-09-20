// import { z } from "zod";

// export const createEmployeeSchema = z.object({
//   emp_no: z.string().min(1, "Employee number is required").max(20, "Max 20 chars"),
//   emp_fname: z.string().min(1, "First name is required").max(50, "Max 50 chars"),
//   emp_lname: z.string().min(1, "Last name is required").max(50, "Max 50 chars"),
//   email: z.email("Invalid email").max(50, "Max 50 chars"),
//   phone_no: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"), // or z.number()
//   dob: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
//   doj: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
//   designation: z.string().min(1, "Designation required"),
//   address1: z.string().min(1, "Address required"),
//   address2: z.string().nullable().optional(),
//   // address2: z.string().optional().default(),
//   city: z.string().min(1, "City required"),
//   state: z.string().min(1, "State required"),
//   country: z.string().min(1, "Country required"),
//   pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
//   division: z.string().min(1, "Division required"),
//   department: z.string().min(1, "Department required"),
//   branch: z.string().min(1, "Branch required"),
// });
 
// export const updateEmployeeSchema = z.object({
//   emp_id: z.uuid("Invalid employee ID"), // from req.params
//   body: z.object({
//     emp_no: z.string().max(20).optional(),
//     emp_fname: z.string().max(50).optional(),
//     emp_lname: z.string().max(50).optional(),
//     email: z.email().max(50).optional(),
//     phone_no: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits").optional(),
//     dob: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }).optional(),
//     doj: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }).optional(),
//     designation: z.string().max(100).optional(),
//     address1: z.string().max(200).optional(),
//     address2: z.string().optional(),
//     city: z.string().max(100).optional(),
//     state: z.string().max(100).optional(),
//     country: z.string().max(100).optional(),
//     pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits").optional(),
//     division: z.string().max(100).optional(),
//     department: z.string().max(100).optional(),
//     branch: z.string().max(100).optional(),
//   }),
// });

// export const deleteEmployeeSchema = z.object({
//   params: z.object({
//     emp_id: z.uuid("Invalid employee ID"),
//   }),
// });

// export const getEmployeeByIdSchema = z.object({
//   params: z.object({
//     emp_id: z.uuid("Invalid employee ID"),
//   }),
// });

  
import { z } from "zod";

// CREATE
export const createEmployeeSchema = z.object({
  body: z.object({
    emp_no: z.string().min(1, "Employee number is required").max(20, "Max 20 chars"),
    emp_fname: z.string().min(1, "First name is required").max(50, "Max 50 chars"),
    emp_lname: z.string().min(1, "Last name is required").max(50, "Max 50 chars"),
    email: z.string().email("Invalid email").max(50, "Max 50 chars"),
    phone_no: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    dob: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
    doj: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
    designation: z.string().min(1, "Designation required"),
    address1: z.string().min(1, "Address required"),
    address2: z.string().nullable().optional(),
    city: z.string().min(1, "City required"),
    state: z.string().min(1, "State required"),
    country: z.string().min(1, "Country required"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
    division: z.string().min(1, "Division required"),
    department: z.string().min(1, "Department required"),
    branch: z.string().min(1, "Branch required"),
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
    phone_no: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits").optional(),
    dob: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }).optional(),
    doj: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }).optional(),
    designation: z.string().max(100).optional(),
    address1: z.string().max(200).optional(),
    address2: z.string().optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits").optional(),
    division: z.string().max(100).optional(),
    department: z.string().max(100).optional(),
    branch: z.string().max(100).optional(),
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

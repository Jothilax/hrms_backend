// import { z } from "zod";

// // Create Dept Schema
// export const createDeptSchema = z.object({
//   body: z.object({
//     dept_name: z.string().min(3, "Department name must be at least 3 characters"),
//     // dept_description: z.string().min(5, "Description must be at least 5 characters"),
//     is_active: z.boolean().optional().default(true),
//     created_by: z.string().optional(),
//     updated_by: z.string().optional(),
//   }),
// });

// // Update Dept Schema
// export const updateDeptSchema = z.object({
//   body: z.object({
//     dept_name: z.string().min(3).optional(),
//     // dept_description: z.string().min(5).optional(),
//     is_active: z.boolean().optional(),
//     created_by: z.string().optional(),
//     updated_by: z.string().optional(),
//   }),
// });

// // Validate Dept ID
// export const idscheme= z.object({
//     id: z.string().uuid("Invalid ID format"),
//   });

// export const idSchema = z.object({
//   params: idscheme,
// });


// // Delete Dept Schema
// export const deleteDeptSchema = z.object({
//   params: z.object({
//     id: z.string().uuid("Invalid ID format"),
//   }),
// });



import { z } from "zod";

// Create Dept Schema
export const createDeptSchema = z.object({
  body: z.object({
    dept_name: z.string().min(3, "Department name must be at least 3 characters"),
    dept_ph: z.number(),    
    dept_email: z.email("Invalid email format"),
    dept_description: z.string().optional(),
    is_active: z.boolean().optional().default(true),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// Update Dept Schema
export const updateDeptSchema = z.object({
  body: z.object({
    dept_name: z.string().min(3).optional(),
    dept_ph: z.number().optional(),
    dept_email: z.email("Invalid email format").optional(),
    dept_description: z.string().optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// Validate Dept ID
export const idScheme = z.object({
  id: z.uuid("Invalid ID format"),
});

export const idSchema = z.object({
  params: idScheme,
});

// Delete Dept Schema
export const deleteDeptSchema = z.object({
  params: z.object({
    id: z.uuid("Invalid ID format"),
  }),
});

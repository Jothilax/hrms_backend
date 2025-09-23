// import { z } from "zod";

// // ✅ Create Department Schema
// export const createDeptSchema = z.object({
//   body: z.object({
//     dept_name: z.string().min(3, "Department name must be at least 3 characters"),
//     dept_description: z.string().min(5, "Description must be at least 5 characters"),
//     is_active: z.boolean().optional().default(true),
//     created_by: z.string().optional(),
//     updated_by: z.string().optional(),
//   }),
// });

// // ✅ Update Department Schema (all fields optional)
// export const updateDeptSchema = z.object({
//   body: z.object({
//     dept_name: z.string().min(3).optional(),
//     dept_description: z.string().min(5).optional(),
//     is_active: z.boolean().optional(),
//     created_by: z.string().optional(),
//     updated_by: z.string().optional(),
//   }),
// });

// // ✅ Validate Department ID (UUID)
// export const idSchema = z.object({
//   params: z.object({
//     id: z.string().uuid("Invalid department ID format"),
//   }),
// });
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
    // dept_description: z.string().min(5, "Description must be at least 5 characters"),
    is_active: z.boolean().optional().default(true),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// Update Dept Schema
export const updateDeptSchema = z.object({
  body: z.object({
    dept_name: z.string().min(3).optional(),
    // dept_description: z.string().min(5).optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// Validate Dept ID
export const idscheme= z.object({
    id: z.string().uuid("Invalid ID format"),
  });

export const idSchema = z.object({
  params: idscheme,
});


// Delete Dept Schema
export const deleteDeptSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID format"),
  }),
});


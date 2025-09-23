import { z } from "zod";

// ✅ Create Location Schema
export const createLocationSchema = z.object({
  body: z.object({
    location_name: z.string().min(3, "Location name must be at least 3 characters"),
    // location_description: z.string().min(5, "Description must be at least 5 characters"),
    // address: z.string().min(5, "Address must be at least 5 characters"),
    // city: z.string().min(2, "City must be at least 2 characters"),
    // state: z.string().min(2, "State must be at least 2 characters"),
    // country: z.string().min(2, "Country must be at least 2 characters"),
    // pincode: z.string().min(4, "Pincode must be at least 4 digits").max(10, "Pincode too long"),
    is_active: z.boolean().default(true),
    created_by: z.uuid().optional(),
    updated_by: z.uuid().optional(),
  }),
});

// ✅ Update Location Schema (all fields optional)
export const updateLocationSchema = z.object({
  body: z.object({
    location_name: z.string().min(3).optional(),
    // location_description: z.string().min(5).optional(),
    // address: z.string().min(5).optional(),
    // city: z.string().min(2).optional(),
    // state: z.string().min(2).optional(),
    // country: z.string().min(2).optional(),
    // pincode: z.string().min(4).max(10).optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Validate Location ID (UUID)
export const idSchema = z.object({
  params: z.object({
    id: z.uuid("Invalid ID format"),
  }),
});

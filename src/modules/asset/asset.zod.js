import { z } from "zod";

// ✅ Create Asset Schema
export const createAssetSchema = z.object({
  body: z.object({
    asset_name: z.string().min(3, "Asset name must be at least 3 characters"),
    asset_type: z.string().min(3, "Asset type must be at least 3 characters"),
    asset_model: z.string().min(1, "Asset model must be at least 1 character").optional(),
    // asset_description: z.string().min(5, "Description must be at least 5 characters"),
    // purchase_date: z.string().date("Invalid purchase date format (YYYY-MM-DD)"),
    // condition: z.string().min(3, "Condition must be at least 3 characters"), // e.g., New, Used, Damaged
    is_active: z.boolean().optional().default(true),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Update Asset Schema (all fields optional)
export const updateAssetSchema = z.object({
  body: z.object({
    asset_name: z.string().min(3).optional(),
    asset_type: z.string().min(3).optional(),
    asset_description: z.string().min(5).optional(),
    purchase_date: z.string().date().optional(),
    condition: z.string().min(3).optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Validate Asset ID (UUID)
export const idSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID format"),
  }),
});

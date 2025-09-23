import express from "express";
const router = express.Router();

import {
  createAsset,
  getAllAssets,
  getAsset,
  updateAsset,
  deleteAsset,
} from "./asset.controller.js";

import {
  createAssetSchema,
  updateAssetSchema,
  idSchema,
} from "./asset.zod.js";

import { validate } from "../../shared/middleware/validate.js";

// ✅ Create Asset
router.post("/addAsset", validate(createAssetSchema), createAsset);

// ✅ Get all Assets
router.get("/getAssets", getAllAssets);

// ✅ Get Asset by ID
router.get("/getAssetById/:id", validate(idSchema, "params"), getAsset);

// ✅ Update Asset by ID
router.put("/updateAsset/:id", validate(updateAssetSchema), updateAsset);

// ✅ Delete Asset by ID (soft delete)
router.delete("/deleteAsset/:id", validate(idSchema, "params"), deleteAsset);

export default router;
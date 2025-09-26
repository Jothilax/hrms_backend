import express from "express";
const router = express.Router();

import {
  createLocation,
  getAllLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} from "./branch.controller.js";

import {
  createLocationSchema,
  updateLocationSchema,
  idSchema,
} from "./branch.zod.js";

import { validate } from "../../shared/middleware/validate.js";

// ✅ Create Location
router.post("/addBranch", validate(createLocationSchema), createLocation);

// ✅ Get all Locations
router.get("/getBranch", getAllLocations);

// ✅ Get Location by ID
router.get("/getBranchById/:id", validate(idSchema, "params"), getLocation);

// ✅ Update Location by ID
router.put("/updateBranch/:id", validate(updateLocationSchema), updateLocation);

// ✅ Delete Location by ID (soft delete)
router.delete("/deleteBranch/:id", validate(idSchema, "params"), deleteLocation);

export default router;

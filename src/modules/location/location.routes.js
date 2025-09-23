import express from "express";
const router = express.Router();

import {
  createLocation,
  getAllLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} from "./location.controller.js";

import {
  createLocationSchema,
  updateLocationSchema,
  idSchema,
} from "./location.zod.js";

import { validate } from "../../shared/middleware/validate.js";

// ✅ Create Location
router.post("/addLocation", validate(createLocationSchema), createLocation);

// ✅ Get all Locations
router.get("/getLocations", getAllLocations);

// ✅ Get Location by ID
router.get("/getLocationById/:id", validate(idSchema, "params"), getLocation);

// ✅ Update Location by ID
router.put("/updateLocation/:id", validate(updateLocationSchema), updateLocation);

// ✅ Delete Location by ID (soft delete)
router.delete("/deleteLocation/:id", validate(idSchema, "params"), deleteLocation);

export default router;

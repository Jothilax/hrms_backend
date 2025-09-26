import express from "express";
const router = express.Router();

import {
  addEmpDetails,
  updateEmpDetails,
  getEmpDetails,
  getEmpDetailsById,
  deleteEmpDetails,
} from "./employeeDetails.controller.js";

import {
  createEmpDetailsSchema,
  updateEmpDetailsSchema,
  getEmpDetailsSchema,
  getEmpDetailsByIdSchema,
  deleteEmpDetailsSchema,
} from "./employeeDetails.zod.js";

import { validate } from "../../shared/middleware/validate.js";

// ----------------- ROUTES -----------------

// Create new employee details
router.post(
  "/addEmpDetails",
  validate(createEmpDetailsSchema),
  addEmpDetails
);

// Update employee details by personal_id
router.put(
  "/updateEmpDetails/:personal_id",
  validate(updateEmpDetailsSchema),
  updateEmpDetails
);

// Get list of employee details
router.get(
  "/getEmpDetails",
  validate(getEmpDetailsSchema),
  getEmpDetails
);

// Get employee details by personal_id
router.get(
  "/getEmpDetailsById/:personal_id",
  validate(getEmpDetailsByIdSchema),
  getEmpDetailsById
);

// Delete employee details by personal_id
router.delete(
  "/deleteEmpDetails/:personal_id",
  validate(deleteEmpDetailsSchema),
  deleteEmpDetails
);

export default router;

import express from "express";
const router = express.Router();

import {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
} from "./role.controller.js";

import {
  createRoleSchema,
  updateRoleSchema,
  idSchema,
} from "./role.zod.js";

import { validate } from "../../shared/middleware/validate.js";

// Create Role
router.post("/addRole", validate(createRoleSchema), createRole);

// Get all Roles
router.get("/getRoles", getAllRoles);

// Get Role by ID
router.get("/getRoleById/:id", validate(idSchema, "params"), getRole);

// Update Role by ID
router.put("/updateRole/:id", validate(updateRoleSchema), updateRole);

// Delete Role by ID
router.delete("/deleteRole/:id", validate(idSchema, "params"), deleteRole);

export default router;


import express from "express";
const router = express.Router();

// ✅ Controllers
import {
  createDept,
  getAllDepts,
  getDeptById,
  updateDept,
  deleteDept,
} from "../dept/dept.controller.js";

// ✅ Zod Schemas
import {
  createDeptSchema,
  updateDeptSchema,
  idSchema,
  deleteDeptSchema,
} from "./dept.zod.js";

// ✅ Validate middleware
import { validate } from "../../shared/middleware/validate.js";


router.post("/addDept", validate(createDeptSchema), createDept);
router.get("/getDepts", getAllDepts);
router.get("/getDeptById/:id", validate(idSchema), getDeptById);
router.put("/updateDept/:id", validate(updateDeptSchema), updateDept);
router.delete("/deleteDept/:id", validate(deleteDeptSchema), deleteDept);

export default router;


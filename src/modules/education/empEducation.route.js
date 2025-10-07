import express from "express";
import {
  addEducation,
  updateEducation,
  getEducation,
  getEducationById,
  deleteEducation,
} from "./empEducation.controller.js";

import {
  createEducationSchema,
  updateEducationSchema,
  getEducationSchema,
  getEducationByIdSchema,
  deleteEducationSchema,
} from "./empEducation.zod.js";

import  { validate } from "../../shared/middleware/validate.js";

const router = express.Router();

// CRUD Routes

router.post("/addEducation", validate(createEducationSchema), addEducation);
router.put("/updateEducation/:edu_id", validate(updateEducationSchema), updateEducation);
router.get("/getEducation", validate(getEducationSchema), getEducation);
router.get("/getEducationById/:edu_id", validate(getEducationByIdSchema), getEducationById);
router.delete("/deleteEducation/:edu_id", validate(deleteEducationSchema), deleteEducation);

export default router;

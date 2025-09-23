import express from "express";
import {
  createProbation,
  getAllProbations,
  getProbationById,
  updateProbation,
  deleteProbation,
} from "./probation.controller.js";

import {
  createProbationSchema,
  updateProbationSchema,
  deleteProbationSchema,
  getProbationByIdSchema,
} from "./probation.zod.js";

import { validate } from "../../shared/middleware/validate.js";

const router = express.Router();

// CREATE
// router.post("/createProbation", validate(createProbationSchema, "body"), createProbation);

router.post("/createProbation", validate(createProbationSchema), createProbation);


// GET ALL
router.get("/getAllProbations", getAllProbations);

// GET BY ID
router.get("/getProbationById/:prob_id", validate(getProbationByIdSchema, "params"), getProbationById);

// UPDATE
router.put(
  "/updateProbation/:prob_id",
  validate(updateProbationSchema, "params"),
  validate(updateProbationSchema, "body"),
  updateProbation
);

// DELETE
router.delete("/deleteProbation/:prob_id", validate(deleteProbationSchema, "params"), deleteProbation);

export default router;

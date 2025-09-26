import express from "express";
import { createDivision, getAllDivisions, getDivisionById, updateDivision, deleteDivision } from "./divisoin.controller.js";
import { createDivisionSchema, updateDivisionSchema, idSchema } from "./division.zod.js";
import { validate } from "../../shared/middleware/validate.js"; // middleware to validate Zod schemas

const router = express.Router();

router.post("/addDivision", validate(createDivisionSchema), createDivision);
router.get("/getAllDivisions", getAllDivisions);
router.get("/getDivisionById/:id", validate(idSchema), getDivisionById);
router.put("/updateDivision/:id", validate(updateDivisionSchema), updateDivision);
router.delete("/deleteDivision/:id", validate(idSchema), deleteDivision);

export default router;

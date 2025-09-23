import express from 'express'
const router = express.Router();
import {
    addEmployee,
    getEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
  } from "./employee.controller.js";
  import {
    createEmployeeSchema ,updateEmployeeSchema,getEmployeeByIdSchema,deleteEmployeeSchema  
  } from "./employee.zod.js";
  import { validate } from "../../shared/middleware/validate.js";

router.post("/addEmployee", validate(createEmployeeSchema),addEmployee);
router.get("/getEmployee", getEmployee);
router.get("/getEmployeeById/:emp_id", validate(getEmployeeByIdSchema), getEmployeeById);
router.put("/updateEmployee/:emp_id", validate(updateEmployeeSchema), updateEmployee);
router.delete("/deleteEmployee/:emp_id", validate(deleteEmployeeSchema), deleteEmployee);

export default router;
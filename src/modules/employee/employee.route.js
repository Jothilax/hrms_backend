// // import express from 'express'
// // const router = express.Router();
// // import {
// //     addEmployee,
// //     getEmployee,
// //     getEmployeeById,
// //     updateEmployee,
// //     deleteEmployee,
// //   } from "./employee.controller.js";
// //   import {
// //     createEmployeeSchema ,updateEmployeeSchema,getEmployeeByIdSchema,deleteEmployeeSchema  
// //   } from "./employee.zod.js";
// //   import { validate } from "../../shared/middleware/validate.js";

// // router.post("/addEmployee", validate(createEmployeeSchema),addEmployee);
// // router.get("/getEmployee", getEmployee);
// // router.get("/getEmployeeById/:emp_id", validate(getEmployeeByIdSchema), getEmployeeById);
// // router.put("/updateEmployee/:emp_id", validate(updateEmployeeSchema), updateEmployee);
// // router.delete("/deleteEmployee/:emp_id", validate(deleteEmployeeSchema), deleteEmployee);

// // export default router;

// import express from "express";
// const router = express.Router();

// import {
//   addEmployee,
//   getEmployee,
//   getEmployeeById,
//   updateEmployee,
//   deleteEmployee,
// } from "./employee.controller.js";

// import {
//   createEmployeeSchema,
//   updateEmployeeSchema,
//   getEmployeeSchema,
//   getEmployeeByIdSchema,
//   deleteEmployeeSchema,
// } from "./employee.zod.js";

// import { validate } from "../../shared/middleware/validate.js";

// router.post("/addEmployee", validate(createEmployeeSchema), addEmployee);
// router.get("/getEmployee", validate(getEmployeeSchema), getEmployee);
// router.get("/getEmployeeById/:emp_id", validate(getEmployeeByIdSchema), getEmployeeById);
// router.put("/updateEmployee/:emp_id", validate(updateEmployeeSchema), updateEmployee);
// router.delete("/deleteEmployee/:emp_id", validate(deleteEmployeeSchema), deleteEmployee);

// export default router;


import express from "express";
const router = express.Router();

import upload from "../../shared/middleware/uploadMiddleware.js"; // 👈 your multer config

import {
  addEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "./employee.controller.js";

import {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeSchema,
  getEmployeeByIdSchema,
  deleteEmployeeSchema,
} from "./employee.zod.js";

import { validate } from "../../shared/middleware/validate.js";

// ✅ Multer for file upload + Zod validation
router.post(
  "/addEmployee",
  upload.single("profile_img"),
  validate(createEmployeeSchema),
  addEmployee
);

router.put(
  "/updateEmployee/:emp_id",
  upload.single("profile_img"),
  validate(updateEmployeeSchema),
  updateEmployee
);

router.get("/getEmployee", validate(getEmployeeSchema), getEmployee);
router.get("/getEmployeeById/:emp_id", validate(getEmployeeByIdSchema), getEmployeeById);
router.delete("/deleteEmployee/:emp_id", validate(deleteEmployeeSchema), deleteEmployee);

export default router;

import express from 'express'
const router = express.Router();
import { addBank,getBank,updateBank,deleteBank } from "../bank/empBank.controller.js";
import {
    createBankSchema,
    updateBankSchema,
    deleteBankSchema,
    getBankByIdSchema,
  } from "./empBank.zod.js";

  import { validate } from "../../shared/middleware/validate.js";

router.post("/addBank",validate(createBankSchema),  addBank);
router.get("/getBank/:emp_id",validate(getBankByIdSchema),  getBank);
router.put("/updateBank/:emp_id",validate(updateBankSchema),  updateBank);
router.delete("/deleteBank/:emp_id", validate(deleteBankSchema), deleteBank);

// module.exports = router;
export default router;
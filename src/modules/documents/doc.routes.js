import express from "express";
import { upload } from "../../shared/middleware/uploadMiddleware.js";
import {
  createDocument,
  getDocument,
  listDocuments,
  updateDocument,
  deleteDocument
} from "./doc.controller.js";

const router = express.Router();

// file fields expected
const cpUpload = upload.fields([
  { name: "aadhaar", maxCount: 1 },
  { name: "pan", maxCount: 1 },
  { name: "bank", maxCount: 1 },
  { name: "experience", maxCount: 1 },
  { name: "education", maxCount: 1 }
]);

router.post("/addDoc", cpUpload, createDocument);
router.get("/getDoc", listDocuments);
router.get("/getDocbyId/:emp_id", getDocument);
router.put("/updateDoc/:emp_id", cpUpload, updateDocument);
router.delete("/deleteDoc/:emp_id", deleteDocument);

export default router;

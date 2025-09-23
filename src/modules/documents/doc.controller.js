import Document from "./doc.model.js";
import { createDocumentSchema, updateDocumentSchema } from "./doc.zod.js";
import { z } from "zod";
import Employee from "../employee/employee.model.js";

const backendUrl = "http://192.168.1.12:4001";
  
/**
 * Expected form fields for files:
 * - aadhaar  (required)
 * - pan      (required)
 * - bank     (optional)
 * - experience (optional)
 * - education  (optional)
 *
 * These will be sent by multer as req.files with field names above.
 */

export const createDocument = async (req, res) => {
  try {
    // Validate metadata
    const parsed = createDocumentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    // Check required files exist
    const files = req.files || {};
    if (!files.aadhaar || !files.pan) {
      return res.status(400).json({ error: "aadhaar and pan files are required." });
    }

    // const doc = await Document.create({
    //   aadhaar_path: files.aadhaar[0].path,
    //   pan_path: files.pan[0].path,
    //   bank_path: files.bank ? files.bank[0].path : null,
    //   experience_path: files.experience ? files.experience[0].path : null,
    //   education_path: files.education ? files.education[0].path : null,
    //   remarks: parsed.data.remarks || null,
    //   created_by: parsed.data.created_by || null,
    //   status: parsed.data.status || undefined
    // });

    const doc = await Document.create({
      emp_id :  parsed.data.emp_id ,
      aadhaar_path: `/uploads/${files.aadhaar[0].filename}`,
      pan_path: `/uploads/${files.pan[0].filename}`,
      bank_path: files.bank ? `/uploads/${files.bank[0].filename}` : null,
      experience_path: files.experience ? `/uploads/${files.experience[0].filename}` : null,
      education_path: files.education ? `/uploads/${files.education[0].filename}` : null,
      remarks: parsed.data.remarks || null,
      created_by: parsed.data.created_by || null,
      status: parsed.data.status || undefined
    });
    // qrUrl: `${backendUrl}/qrcodes/${diningTable.id}.png`,

    return res.status(201).json({ data: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// export const getDocument = async (req, res) => {
//   try {
//     const { emp_id } = req.params;
//     const doc = await Employee.findByPk(emp_id);
//     if (!doc) return res.status(404).json({ error: "Not found" });
//     return res.json({ data: doc });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };


// export const getDocument = async (req, res) => {
//   try {
//     const { emp_id } = req.params;

//     // findAll in case you want multiple documents per employee
//     const docs = await Document.findAll({ where: { emp_id } });

//     // Return empty array if none found
//     return res.json({ data: docs });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

const BASE_URL = process.env.BASE_URL || "http://192.168.1.16:4001";

export const getDocument = async (req, res) => {
  try {
    const { emp_id } = req.params;

    // findAll in case you want multiple documents per employee
    const docs = await Document.findAll({ where: { emp_id } });

    if (!docs || docs.length === 0) {
      return res.json({ data: [] });
    }

    // Map docs to include full URLs
    const formattedDocs = docs.map(doc => ({
      // ...doc.toJSON(),
      id : doc.id,
      emp_id : doc.emp_id,
      status : doc.status,
      remarks : doc.remarks,
      created_by : doc.created_by,
      createdAt : doc.updated_by,
      createdAt : doc.createdAt,
      updatedAt : doc.updatedAt,
      aadhaar_url: doc.aadhaar_path ? `${BASE_URL}${doc.aadhaar_path}` : null,
      pan_url: doc.pan_path ? `${BASE_URL}${doc.pan_path}` : null,
      bank_url: doc.bank_path ? `${BASE_URL}${doc.bank_path}` : null,
      experience_url: doc.experience_path ? `${BASE_URL}${doc.experience_path}` : null,
      education_url: doc.education_path ? `${BASE_URL}${doc.education_path}` : null,
    }));

    return res.json({ data: formattedDocs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const listDocuments = async (req, res) => {
  try {
    const docs = await Document.findAll({ order: [["created_at","DESC"]] });
    return res.json({ data: docs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// export const updateDocument = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const parsed = updateDocumentSchema.safeParse(req.body);
//     if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

//     const doc = await Document.findByPk(id);
//     if (!doc) return res.status(404).json({ error: "Not found" });

//     // if new files were uploaded, replace paths
//     const files = req.files || {};
//     const updateFields = { ...parsed.data };

//     if (files.aadhaar) updateFields.aadhaar_path = files.aadhaar[0].path;
//     if (files.pan) updateFields.pan_path = files.pan[0].path;
//     if (files.bank) updateFields.bank_path = files.bank[0].path;
//     if (files.experience) updateFields.experience_path = files.experience[0].path;
//     if (files.education) updateFields.education_path = files.education[0].path;

//     await doc.update(updateFields);
//     return res.json({ data: doc });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

export const updateDocument = async (req, res) => {
  try {
    const { emp_id } = req.params;

    // validate body
    const parsed = updateDocumentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    // check if document exists for emp_id
    const doc = await Document.findOne({ where: { emp_id } });
    if (!doc) {
      return res.status(404).json({ error: "Document not found for this employee" });
    }

    const files = req.files || {};
    const updateFields = { ...parsed.data };

    // ✅ store only filename, prefix with /uploads/
    if (files.aadhaar) updateFields.aadhaar_path = `/uploads/${files.aadhaar[0].filename}`;
    if (files.pan) updateFields.pan_path = `/uploads/${files.pan[0].filename}`;
    if (files.bank) updateFields.bank_path = `/uploads/${files.bank[0].filename}`;
    if (files.experience) updateFields.experience_path = `/uploads/${files.experience[0].filename}`;
    if (files.education) updateFields.education_path = `/uploads/${files.education[0].filename}`;

    await doc.update(updateFields);

    return res.json({ data: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// export const deleteDocument = async (req, res) => {
//   try {
//     const { emp_id } = req.params;
//     // const doc = await Document.findByPk(emp_id);
//     const doc = await Document.findOne({ where: { emp_id } });

//     if (!doc) return res.status(404).json({ error: "Not found" });
//     await doc.destroy();
//     return res.json({ message: "Deleted" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };


import fs from "fs";
import path from "path";

export const deleteDocument = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const doc = await Document.findOne({ where: { emp_id } });

    if (!doc) return res.status(404).json({ error: "Not found" });

    // List of all file fields
    const fileFields = [
      doc.aadhaar_path,
      doc.pan_path,
      doc.bank_path,
      doc.experience_path,
      doc.education_path
    ];

    // delete files if they exist
    fileFields.forEach(filePath => {
      if (filePath) {
        // convert "/uploads/filename" → actual local path "uploads/filename"
        const actualPath = path.join(process.cwd(), filePath.replace(/^\//, ""));
        fs.unlink(actualPath, err => {
          if (err) console.warn(`⚠️ Could not delete file: ${actualPath}`, err.message);
        });
      }
    });

    // delete DB record
    await doc.destroy();

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

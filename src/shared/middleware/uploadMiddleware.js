// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // const uploadDir = path.join(process.cwd(), "uploads");
// // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, uploadDir),
// //   filename: (req, file, cb) => {
// //     const ext = path.extname(file.originalname);
// //     const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
// //     cb(null, name);
// //   }
// // });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let folder = "uploads";

//     if (file.fieldname === "profile_img") {
//       folder = path.join(process.cwd(), "uploads/profiles");
//     } else if (file.fieldname === "document") {
//       folder = path.join(process.cwd(), "uploads/documents");
//     }

//     if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
//     cb(null, folder);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, name);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // Accept PDFs/images. Adjust as needed.
//   const allowed = /pdf|jpeg|jpg|png/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowed.test(ext)) cb(null, true);
//   else cb(null, false);
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB
// });

// export default upload;



import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(process.cwd(), "uploads");

    if (file.fieldname === "profile_img") {
      folder = path.join(process.cwd(), "uploads/profiles");
    } else if (
      file.fieldname === "document" ||
      file.fieldname.startsWith("educations[") // ✅ supports educations[0][document], educations[1][document] etc.
    ) {
      folder = path.join(process.cwd(), "uploads/educations");
    }

    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

// ✅ File Filter (accept pdf/jpg/png/jpeg)
const fileFilter = (req, file, cb) => {
  const allowed = /pdf|jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only PDF, JPG, JPEG, PNG files are allowed"), false);
};

// ✅ Multer Upload Config
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

export default upload;


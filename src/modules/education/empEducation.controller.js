import Education from "./empEducation.model.js";
import { Op } from "sequelize";

// ----------------- CREATE -----------------
// export const addEducation = async (req, res) => {
//   try {
//     const newEdu = await Education.create(req.body);
//     return res.status(201).json({ message: "Education added", data: newEdu });
//   } catch (err) {
//     console.error("❌ Error addEducation:", err);
//     return res.status(500).json({ message: "Error adding education", error: err.message });
//   }
// };

export const addEducation = async (req, res) => {
  try {
    const { emp_id, educations, created_by } = req.body;

    // Attach emp_id & created_by to each record
    const records = educations.map((edu) => ({
      ...edu,
      emp_id,
      created_by,
    }));

    const savedEducations = await Education.bulkCreate(records);

    return res.status(201).json({
      message: "Education details added successfully",
      data: savedEducations,
    });
  } catch (err) {
    console.error("❌ Error addMultipleEducation:", err);
    return res.status(500).json({ message: "Error saving education", error: err.message });
  }
};

// ----------------- UPDATE -----------------
export const updateEducation = async (req, res) => {
  try {
    const { edu_id } = req.params;
    const education = await Education.findByPk(edu_id);
    if (!education) return res.status(404).json({ message: "Education not found" });

    await education.update(req.body);
    return res.json({ message: "Education updated", data: education });
  } catch (err) {
    console.error("❌ Error updateEducation:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------- GET LIST -----------------
export const getEducation = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, orderBy = "createdAt", order = "asc" } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { qualification: { [Op.like]: `%${search}%` } },
        { institution: { [Op.like]: `%${search}%` } },
        { university: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { rows, count } = await Education.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[orderBy, order]],
    });

    return res.json({
      message: "Education fetched successfully",
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("❌ Error getEducation:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------- GET BY ID -----------------
export const getEducationById = async (req, res) => {
  try {
    const { edu_id } = req.params;
    const education = await Education.findByPk(edu_id);

    if (!education) return res.status(404).json({ message: "Education not found" });

    return res.json({ data: education });
  } catch (err) {
    console.error("❌ Error getEducationById:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------- DELETE -----------------
export const deleteEducation = async (req, res) => {
  try {
    const { edu_id } = req.params;
    const education = await Education.findByPk(edu_id);
    if (!education) return res.status(404).json({ message: "Education not found" });

    await education.destroy();
    return res.json({ message: "Education deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleteEducation:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

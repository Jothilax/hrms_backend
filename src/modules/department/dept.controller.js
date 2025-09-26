import Department from "./dept.model.js"; // Sequelize model for department
import { ValidationError, UniqueConstraintError } from "sequelize";

// ✅ Add Department
export const createDept = async (req, res) => {
  console.log("Incoming Body:", req.body);
  try {
    const newDept = await Department.create(req.body);
    res.status(201).json({ message: "Department added", data: newDept });
  } catch (error) {
    console.error("DB Error:", error);

    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        message: "Duplicate entry. Department name already exists.",
      });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Departments
export const getAllDepts = async (req, res) => {
  try {
    const {
      includeInactive = false,
      search,
      page,
      limit,
      orderBy = "createdAt",
      order = "asc",
    } = req.query;

    const where = {};
    if (includeInactive === "false" || !includeInactive) where.is_active = true;

    if (search) {
      where[Op.or] = [
        { dept_name: { [Op.like]: `%${search}%` } },
        { dept_description: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = page && limit ? (page - 1) * limit : undefined;
    const limitVal = page && limit ? +limit : undefined;

    const rows = await Department.findAll({
      where,
      offset,
      limit: limitVal,
      order: [[orderBy, order.toUpperCase()]],
    });

    const count = await Department.count({ where });

    return res.status(200).json({
      message: "Departments fetched successfully",
      rows,
      count,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Failed to fetch departments",
      error: error.message,
    });
  }
};

export const getDeptById = async (req, res) => {
  try {
    const { dept_id } = req.params;

    const dept = await Department.findOne({
      where: { dept_id:req.params.id }, // optionally add is_active: true
      // attributes: ['dept_name']
    });

    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department fetched successfully",
      data: dept,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// ✅ Update Department
export const updateDept = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.body; // already validated by validate.js

    const [updated] = await Department.update(validatedData, { where: { dept_id: id } });

    if (updated === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const deleteDept = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [updated] = await Department.update(
//       { is_active: false },
//       { where: { dept_id: id, is_active: true } }
//     );

//     if (updated === 0) {
//       return res.status(404).json({ message: "Department not found or already inactive" });
//     }

//     return res.status(200).json({ message: "Department soft deleted successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const deleteDept = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete (because paranoid:true is set in model)
    const deleted = await Department.destroy({
      where: { dept_id: id }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Department not found or already deleted" });
    }

    return res.status(200).json({ message: "Department soft deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import EmployeeDetails from "./employeeDetails.model.js";  // your model file
import { Op } from "sequelize";

// ----------------- CREATE -----------------
export const addEmpDetails = async (req, res) => {
  try {
    const newDetails = await EmployeeDetails.create({
      ...req.body,
      created_by: req.user?.id || "system", // example, adjust to your auth
    });

    return res.status(201).json({
      message: "Employee details added successfully",
      data: newDetails,
    });
  } catch (err) {
    console.error("❌ Error in addEmpDetails:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------- UPDATE -----------------
export const updateEmpDetails = async (req, res) => {
  try {
    const { personal_id } = req.params;

    const empDetails = await EmployeeDetails.findByPk(personal_id);
    if (!empDetails) {
      return res.status(404).json({ message: "Employee details not found" });
    }

    await empDetails.update({
      ...req.body,
      updated_by: req.user?.id || "system",
    });

    return res.json({
      message: "Employee details updated successfully",
      data: empDetails,
    });
  } catch (err) {
    console.error("❌ Error in updateEmpDetails:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------- GET LIST -----------------
export const getEmpDetails = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      order = "asc",
    } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { city: { [Op.like]: `%${search}%` } },
        { state: { [Op.like]: `%${search}%` } },
        { nationality: { [Op.like]: `%${search}%` } },
      ];
    }

    const validColumns = [
      "createdAt",
      "updatedAt",
      "dob",
      "city",
      "state",
      "nationality",
    ];
    const orderBySafe = validColumns.includes(orderBy) ? orderBy : "createdAt";
    const orderSafe = ["asc", "desc"].includes(order.toLowerCase())
      ? order
      : "asc";

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { rows, count } = await EmployeeDetails.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[orderBySafe, orderSafe]],
    });

    return res.json({
      message: "Employee details fetched successfully",
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("❌ Error in getEmpDetails:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------- GET BY ID -----------------
export const getEmpDetailsById = async (req, res) => {
  try {
    const { personal_id } = req.params;
    const empDetails = await EmployeeDetails.findByPk(personal_id);

    if (!empDetails) {
      return res.status(404).json({ message: "Employee details not found" });
    }

    return res.json({ data: empDetails });
  } catch (err) {
    console.error("❌ Error in getEmpDetailsById:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------- DELETE -----------------
export const deleteEmpDetails = async (req, res) => {
  try {
    const { personal_id } = req.params;

    const empDetails = await EmployeeDetails.findByPk(personal_id);
    if (!empDetails) {
      return res.status(404).json({ message: "Employee details not found" });
    }

    await empDetails.destroy(); // soft delete since you enabled paranoid

    return res.json({ message: "Employee details deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteEmpDetails:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

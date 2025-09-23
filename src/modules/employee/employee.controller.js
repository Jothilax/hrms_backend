import Employee from './employee.model.js'
import { ValidationError, UniqueConstraintError } from "sequelize";
 
export const addEmployee = async (req, res) => {
  console.log("Incoming Body:", req.body); // 🔍 Log input

  try {
    const newEmp = await Employee.create(req.body);
    res.status(201).json({ message: "Employee added", data: newEmp });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getEmployee = async (req, res) => {
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
    if (includeInactive === 'false' || !includeInactive) where.is_active = true;

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } }, // assuming Employee has 'name'
      ];
    }

    const offset = page && limit ? (page - 1) * limit : undefined;
    const limitVal = page && limit ? +limit : undefined;

    const rows = await Employee.findAll({
      where,
      offset,
      limit: limitVal,
      order: [[orderBy, order.toUpperCase()]],
    });

    const count = await Employee.count({ where });

    return res.status(200).json({
      message: "Employees fetched successfully",
      rows,
      count,
    });

  } catch (error) {
    console.log("Error :", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;

    if (!emp_id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const [updated] = await Employee.update(req.body, {
      where: { emp_id },
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error :", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Duplicate entry. The email or employee number already exists.",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { emp_id } = req.params;  // ✅ directly use emp_id

    const getEmp = await Employee.findByPk(emp_id);

    if (!getEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: getEmp,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { emp_id: req.params.emp_id }   // ✅ fix here
    });

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json({ message: "Employee deleted (soft) successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

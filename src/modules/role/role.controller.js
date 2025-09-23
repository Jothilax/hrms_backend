import Role from "./role.model.js";
import { z } from "zod";

// ✅ Create Role
export const createRole = async (req, res) => {
  console.log("Incoming Body:", req.body); 
  try {
    const validatedData = req.body; // already validated by validate.js
    const newRole = await Role.create(validatedData);
    res.status(201).json({ message: "Role added successfully", data: newRole });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Roles
export const getAllRoles = async (req, res) => {
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
        { role_name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = page && limit ? (page - 1) * limit : undefined;
    const limitVal = page && limit ? +limit : undefined;

    const rows = await Role.findAll({
      where,
      offset,
      limit: limitVal,
      order: [[orderBy, order.toUpperCase()]],
    });

    const count = await Role.count({ where });

    return res.status(200).json({
      message: "Roles fetched successfully",
      rows,
      count,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Failed to fetch roles",
      error: error.message,
    });
  }
};

// ✅ Get Role by ID
export const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({
      message: "Role fetched successfully",
      data: role,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.body; // already validated by validate.js

    const [updated] = await Role.update(validatedData, { where: { role_id: id } });

    if (updated === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Role (soft delete)
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Role.update(
      { is_active: false },
      { where: { role_id: id, is_active: true } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Role not found or already inactive" });
    }

    return res.status(200).json({ message: "Role soft deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


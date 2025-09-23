import Location from "./location.model.js";
import { z } from "zod";
import { UniqueConstraintError } from "sequelize";

export const createLocation = async (req, res) => {
  console.log("Incoming Body:", req.body);

  try {
    const newLocation = await Location.create(req.body);

    res.status(201).json({
      message: "Location added successfully",
      data: newLocation,
    });
  } catch (error) {
    console.error("DB Error:", error);

    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        message: "Duplicate entry. Location name or code already exists.",
      });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Get All Locations
export const getAllLocations = async (req, res) => {
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
        { location_name: { [Op.like]: `%${search}%` } },
        { created_by: { [Op.like]: `%${search}%` } },
        { updated_by: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = page && limit ? (page - 1) * limit : undefined;
    const limitVal = page && limit ? +limit : undefined;

    const rows = await Location.findAll({
      where,
      offset,
      limit: limitVal,
      order: [[orderBy, order.toUpperCase()]],
    });

    const count = await Location.count({ where });

    return res.status(200).json({
      message: "Locations fetched successfully",
      rows,
      count,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Failed to fetch locations",
      error: error.message,
    });
  }
};

// ✅ Get Location by ID
export const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByPk(id);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    return res.status(200).json({
      message: "Location fetched successfully",
      data: location,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Location
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.body; // already validated by validate.js

    const [updated] = await Location.update(validatedData, { where: { location_id: id } });

    if (updated === 0) {
      return res.status(404).json({ message: "Location not found" });
    }

    return res.status(200).json({ message: "Location updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Location (soft delete)
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Location.update(
      { is_active: false },
      { where: { location_id: id, is_active: true } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Location not found or already inactive" });
    }

    return res.status(200).json({ message: "Location soft deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

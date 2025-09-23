import Asset from "./asset.model.js";
import { z } from "zod";

// ✅ Create Asset
export const createAsset = async (req, res) => {
  console.log("Incoming Body:", req.body);
  try {
    const validatedData = req.body; // already validated by validate.js
    const newAsset = await Asset.create(validatedData);
    res.status(201).json({ message: "Asset added successfully", data: newAsset });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Assets
export const getAllAssets = async (req, res) => {
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
        { assetId: { [Op.like]: `%${search}%` } },
        { employeeName: { [Op.like]: `%${search}%` } },
        { assetType: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = page && limit ? (page - 1) * limit : undefined;
    const limitVal = page && limit ? +limit : undefined;

    const rows = await Asset.findAll({
      where,
      offset,
      limit: limitVal,
      order: [[orderBy, order.toUpperCase()]],
    });

    const count = await Asset.count({ where });

    return res.status(200).json({
      message: "Assets fetched successfully",
      rows,
      count,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Failed to fetch assets",
      error: error.message,
    });
  }
};

// ✅ Get Asset by ID
export const getAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findByPk(id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    return res.status(200).json({
      message: "Asset fetched successfully",
      data: asset,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Asset
export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.body; // already validated by validate.js

    const [updated] = await Asset.update(validatedData, { where: { asset_id: id } });

    if (updated === 0) {
      return res.status(404).json({ message: "Asset not found" });
    }

    return res.status(200).json({ message: "Asset updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Asset (soft delete)
export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Asset.update(
      { is_active: false },
      { where: { asset_id: id, is_active: true } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Asset not found or already inactive" });
    }

    return res.status(200).json({ message: "Asset soft deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

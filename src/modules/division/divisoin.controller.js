import Division from "./division.model.js";

// ✅ Create Division
export const createDivision = async (req, res) => {
  try {
    const newDivision = await Division.create(req.body);
    res.status(201).json({ message: "Division created successfully", data: newDivision });
  } catch (error) {
    console.error("Error creating division:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Get all Divisions
export const getAllDivisions = async (req, res) => {
  try {
    const { includeInactive = false, search, page, limit, orderBy = "createdAt", order = "asc" } = req.query;

    const where = {};
    if (!includeInactive || includeInactive === "false") where.is_active = true;

    if (search) {
      where.division_name = { [Op.like]: `%${search}%` };
    }

    const offset = page && limit ? (page - 1) * limit : undefined;
    const limitVal = page && limit ? +limit : undefined;

    const rows = await Division.findAll({ where, offset, limit: limitVal, order: [[orderBy, order.toUpperCase()]] });
    const count = await Division.count({ where });

    res.status(200).json({ message: "Divisions fetched successfully", rows, count });
  } catch (error) {
    console.error("Error fetching divisions:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Get Division by ID
export const getDivisionById = async (req, res) => {
  try {
    const { id } = req.params;
    const division = await Division.findByPk(id);

    if (!division) return res.status(404).json({ message: "Division not found" });

    res.status(200).json({ message: "Division fetched successfully", data: division });
  } catch (error) {
    console.error("Error fetching division:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Update Division
export const updateDivision = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Division.update(req.body, { where: { division_id: id } });

    if (updated === 0) return res.status(404).json({ message: "Division not found" });

    res.status(200).json({ message: "Division updated successfully" });
  } catch (error) {
    console.error("Error updating division:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Delete Division (Soft delete due to paranoid:true)
export const deleteDivision = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Division.destroy({ where: { division_id: id } });

    if (deleted === 0) return res.status(404).json({ message: "Division not found" });

    res.status(200).json({ message: "Division soft deleted successfully" });
  } catch (error) {
    console.error("Error deleting division:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

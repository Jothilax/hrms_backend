import Probation from "./probation.model.js";

// CREATE
export const createProbation = async (req, res) => {
  try {
    const probation = await Probation.create(req.body);
    res.status(201).json({
      message: "Probation record created successfully",
      data: probation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create probation record",
      error: error.message,
    });
  }
};

// GET ALL
export const getAllProbations = async (req, res) => {
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

    const rows = await Probation.findAll({
      where,
      offset,
      limit: limitVal,
      order: [[orderBy, order.toUpperCase()]],
    });

    const count = await Probation.count({ where });
   
    return res.status(200).json({
      message: "Probation fetched successfully",
      rows,
      count,
    });


    // const probations = await Probation.findAll();
    // res.status(200).json(probations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch probations",
      error: error.message,
    });
  }
};

// GET BY ID
export const getProbationById = async (req, res) => {
  try {
    const { prob_id } = req.params;
    const probation = await Probation.findByPk(prob_id);

    if (!probation) {
      return res.status(404).json({ message: "Probation record not found" });
    }

    return res.status(200).json({
      message: "Probation fetched successfully",
      data: probation,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch probation record",
      error: error.message,
    });
  }
};

// UPDATE
export const updateProbation = async (req, res) => {
  try {
    const { prob_id } = req.params;
    const probation = await Probation.findByPk(prob_id);

    if (!probation) {
      return res.status(404).json({ message: "Probation record not found" });
    }

    await probation.update(req.body);

    res.status(200).json({
      message: "Probation record updated successfully",
      data: probation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update probation record",
      error: error.message,
    });
  }
};

// DELETE
export const deleteProbation = async (req, res) => {
  try {
    const { prob_id } = req.params;
    const probation = await Probation.findByPk(prob_id);

    if (!probation) {
      return res.status(404).json({ message: "Probation record not found" });
    }

    await probation.destroy(); // soft delete (paranoid: true in model)

    res.status(200).json({ message: "Probation record deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete probation record",
      error: error.message,
    });
  }
};

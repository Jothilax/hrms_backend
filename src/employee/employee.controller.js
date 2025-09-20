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



export const getEmployee = async(req,res)=>{
    try {
        // const allEmployee = await Employee.findAll();
        const allEmployee = await Employee.findAll();
        
        return res.status(200).json({
            message : "Employees fetched successfully",
            allEmployee
        });
    } catch (error) {
        console.log("Error :", error);
    }
}
// export const getEmployeeById = async (req, res) => {
//   try {
//     const { id } = paymentIdParamSchema.parse(req.params);
//     const { emp_id } = req.params;

//     const getEmp = await Employee.findByPk(emp_id);

//     if (!getEmp) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     return res.status(200).json({
//       message: "Employee fetched successfully",
//       data: getEmp,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// export const updateEmployee = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       if (!id) {
//         return res.status(400).json({ message: "Employee ID is required" });
//       }
  
//       const [updated] = await Employee.update(req.body, {
//         where: { emp_id: id },
//       });
  
//       if (updated === 0) {
//         return res.status(404).json({ message: "Employee not found" });
//       }
  
//       return res.status(200).json({
//         message: "Employee updated successfully",
//       });
//     } catch (error) {
//       console.error("Error :", error);
  
//       if (error.name === "SequelizeUniqueConstraintError") {
//         return res.status(400).json({
//           message: "Duplicate entry. The email or employee name already exists.",
//         });
//       }
  
//       return res.status(500).json({
//         message: "Something went wrong",
//       });
//     }
//   };
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

  
// export const deleteEmployee = async (req, res) => {
//     try {
//       const deleted = await Employee.destroy({
//         where: { id: req.params.id }   // use your PK field (check if it's `id` or `emp_no`)
//       });
  
//       if (!deleted) {
//         return res.status(404).json({ message: "Employee not found" });
//       }
  
//       return res.json({ message: "Employee deleted (soft) successfully" });
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
  

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

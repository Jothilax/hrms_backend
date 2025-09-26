import Employee from "./employee.model.js";
import { Op } from "sequelize";
const BASE_URL = "http://192.168.1.16:4001";
import PersonnelEmployee from "../xtown/personnelEmployee.model.js";
import { v4 as uuidv4 } from "uuid";

// ----------------- CREATE -----------------
``
// export const addEmployee = async (req, res) => {
//   try {
//     const { emp_fname, emp_lname, ...otherFields } = req.body;

//     // 1️⃣ Check xtown database
//     let attendance_id;
//     try {
//       const personnel = await PersonnelEmployee.findOne({
//         where: {
//           first_name: emp_fname,
//           last_name: emp_lname,
//         },
//       });
//       console.log("personnel :" , personnel);
//       console.log("attendance_id :" , personnel.id);
//       attendance_id = personnel ? personnel.id : uuidv4(); // use uuid if not found
//     } catch (err) {
//       console.error("xtown lookup failed, generating new UUID", err);
//       attendance_id = uuidv4(); // fallback in case xtown DB is down
//     }

//     // 2️⃣ Create employee in hrms
//     const newEmployee = await Employee.create({
//       emp_fname,
//       emp_lname,
//       ...otherFields,
//       attendance_id,
//     });

//     res.status(201).json({ message: "Employee added", data: newEmployee });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error adding employee", error: err.message });
//   }
// };


export const addEmployee = async (req, res) => {
  try {
    const { emp_fname, emp_lname, ...otherFields } = req.body;

    let attendance_id;
    try {
      const personnel = await PersonnelEmployee.findOne({
        where: { first_name: emp_fname, last_name: emp_lname },
      });

      if (personnel) {
        attendance_id = personnel.id; // from xtown DB
      } else {
        // numeric fallback instead of UUID
        attendance_id = Date.now(); 
      }
    } catch (err) {
      console.error("xtown lookup failed, generating numeric ID", err);
      attendance_id = Date.now();
    }

    const newEmployee = await Employee.create({
      emp_fname,
      emp_lname,
      ...otherFields,
      attendance_id,
    });

    res.status(201).json({ message: "Employee added", data: newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding employee", error: err.message });
  }
};


// ----------------- UPDATE -----------------
export const updateEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;

    const employee = await Employee.findByPk(emp_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const filePath = req.file ? `/uploads/profiles/${req.file.filename}` : employee.profile_img;

    await employee.update({
      ...req.body,
      profile_img: filePath,
    });

    return res.json({ message: "Employee updated", data: employee });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


// ----------------- GET LIST -----------------


export const getEmployee = async (req, res) => {
  try {
    const {
      includeInactive = "false",
      search,
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      order = "asc",
    } = req.query;

    const where = {};
    if (includeInactive === "false" || !includeInactive) {
      where.is_active = true;
    }

    if (search) {
      where[Op.or] = [
        { emp_fname: { [Op.like]: `%${search}%` } },
        { emp_lname: { [Op.like]: `%${search}%` } },
        { emp_no: { [Op.like]: `%${search}%` } },
      ];
    }

    const validColumns = [
      "createdAt",
      "updatedAt",
      "emp_fname",
      "emp_lname",
      "emp_no",
      "doj",
    ];
    const orderBySafe = validColumns.includes(orderBy) ? orderBy : "createdAt";
    const orderSafe = ["asc", "desc"].includes(order.toLowerCase())
      ? order
      : "asc";

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { rows, count } = await Employee.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[orderBySafe, orderSafe]],
    });

    // ✅ Add full URL for profile_img
    const employeesWithFullUrl = rows.map((emp) => {
      const empData = emp.toJSON();
      if (empData.profile_img) {
        empData.profile_img = `${BASE_URL}${empData.profile_img}`;
      }
      return empData;
    });

    // ✅ counts
    const totalEmployees = await Employee.count();
    const activeEmployees = await Employee.count({ where: { is_active: true } });
    const inactiveEmployees = await Employee.count({
      where: { is_active: false },
    });
    const newEmployees = await Employee.count({
      where: { status: "New Employee" },
    });

    return res.json({
      message: "Employees fetched successfully",
      data: employeesWithFullUrl,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
      },
      counts: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: inactiveEmployees,
        newJoinee: newEmployees,
      },
    });
  } catch (err) {
    console.error("❌ Error in getEmployee:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ----------------- GET BY ID -----------------

export const getEmployeeById = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const employee = await Employee.findByPk(emp_id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // ✅ Convert to plain object and add BASE_URL for profile_img
    const empData = employee.toJSON();
    if (empData.profile_img) {
      empData.profile_img = `${BASE_URL}${empData.profile_img}`;
    }

    return res.json({ data: empData });
  } catch (err) {
    console.error("❌ Error in getEmployeeById:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};


// ----------------- DELETE -----------------

export const deleteEmployee = async (req, res) => {
  try {
    const { emp_id } = req.params;

    const employee = await Employee.findByPk(emp_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Example: employee.profile_image holds "uploads/employee123.jpg"
    if (employee.profile_image) {
      const filePath = path.join(process.cwd(), employee.profile_image);

      // check if file exists before deleting
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // delete file
      }
    }

    await employee.destroy(); // soft delete in DB

    return res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

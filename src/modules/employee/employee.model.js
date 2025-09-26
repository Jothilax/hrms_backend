import { DataTypes, Op } from "sequelize";
import { hrms } from "../../db/connectToDb.js";

const Employee = hrms.define(
  "Employee",
  {
    emp_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    emp_no: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    attendance_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true,
    },
    emp_fname: { type: DataTypes.STRING(100), allowNull: false },
    emp_lname: { type: DataTypes.STRING(100), allowNull: false },
    role_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "roles", key: "role_id" },
    },
    dept_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "department", key: "dept_id" },
    },
    branch_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "branch", key: "branch_id" },
    },
    doj: { type: DataTypes.DATEONLY, allowNull: false },
    reporting_manager: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "employees", key: "emp_id" }, // self-reference
    },
    employee_type: {
      type: DataTypes.ENUM("Permanent", "Contract", "Intern"),
      allowNull: false,
      defaultValue: "Permanent",
    },
    shift_hours: { type: DataTypes.STRING(50), allowNull: true }, // e.g. "9 AM - 6 PM"
    profile_img : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active : {
      type: DataTypes.BOOLEAN,
      defaultValue : true,
      allowNull: false,
    },
    status : {
      type: DataTypes.ENUM("Active", "Inactive", "New Employee"),
      defaultValue: "Active",
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  
  },
  {
    tableName: "employees",
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: async (employee) => {
        if (!employee.emp_no) {
          const year = new Date().getFullYear().toString().slice(-2); // "25"
          const prefix = `XT-${year}-`;

          const lastEmployee = await Employee.findOne({
            where: { emp_no: { [Op.like]: `${prefix}%` } },
            order: [["createdAt", "DESC"]],
          });

          let sequence = 1;
          if (lastEmployee) {
            const lastSeq = parseInt(lastEmployee.emp_no.split("-")[2], 10);
            sequence = lastSeq + 1;
          }

          const paddedSeq = String(sequence).padStart(3, "0");
          employee.emp_no = `${prefix}${paddedSeq}`;
        }
      },
    },
  }
);

export default Employee;

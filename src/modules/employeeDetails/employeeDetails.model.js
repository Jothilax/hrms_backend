import { DataTypes, Op } from "sequelize";
import { hrms } from "../../db/connectToDb.js";

const Employee = hrms.define(
  "Employee",
  {
    // 🔹 Core IDs
    personal_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    emp_id: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
      references : {
        model : "employees" ,
        key : "emp_id"
      }
    },
    // 🔹 Personal Info
   
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    gender: { type: DataTypes.ENUM("Male", "Female", "Other"), allowNull: false },
    marital_status: { type: DataTypes.ENUM("Single", "Married", "Divorced", "Widowed"), allowNull: false },
    blood_group: { type: DataTypes.STRING(5), allowNull: false },
    nationality: { type: DataTypes.STRING(50), allowNull: false },

    // 🔹 Contact Info
    permanent_address: { type: DataTypes.TEXT, allowNull: true },
    current_address: { type: DataTypes.TEXT, allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    state: { type: DataTypes.STRING(100), allowNull: true },
    zip_code: { type: DataTypes.STRING(20), allowNull: true },
    mobile_number: { type: DataTypes.STRING(15), allowNull: true },
    email: { type: DataTypes.STRING(150), allowNull: true },

    // 🔹 Government & Legal
    pan_number: { type: DataTypes.STRING(20), allowNull: true },
    aadhar_number: { type: DataTypes.STRING(20), allowNull: true },
    pf_number: { type: DataTypes.STRING(30), allowNull: true },
    esi_number: { type: DataTypes.STRING(30), allowNull: true },
    tax_category: { type: DataTypes.STRING(50), allowNull: true },
    tds_info: { type: DataTypes.STRING(100), allowNull: true },

    // 🔹 Emergency Contact
    emergency_contact_name: { type: DataTypes.STRING(100), allowNull: true },
    emergency_contact_relation: { type: DataTypes.STRING(50), allowNull: true },
    emergency_contact_phone: { type: DataTypes.STRING(15), allowNull: true },
    emergency_contact_address: { type: DataTypes.TEXT, allowNull: true },

    // 🔹 HRMS Core (same as before)
    
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.UUID, allowNull: true },
    updated_by: { type: DataTypes.UUID, allowNull: true },
  },
  {
    tableName: "emp_details",
    timestamps: true,
    paranoid: true,
   
  }
);

export default Employee;

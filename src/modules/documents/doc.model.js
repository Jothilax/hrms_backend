import { DataTypes } from "sequelize";
import sequelize from "../../db/connectToDb.js";
import Employee  from '../employee/employee.model.js';

const Document = sequelize.define("Document", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  emp_id : {
    type: DataTypes.UUID,
    allowNull : false,
    references : {
      model : Employee,
      key : "emp_id"
    }
  },
  aadhaar_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pan_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bank_path: {
    type: DataTypes.STRING,
    allowNull: true
  },
  experience_path: {
    type: DataTypes.STRING,
    allowNull: true
  },
  education_path: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("pending","verified","rejected"),
    defaultValue: "pending"
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true
  },
  updated_by: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "documents",
  timestamps: true,
  underscored: true
});

export default Document;

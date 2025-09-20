import { DataTypes } from "sequelize";
import sequelize from "../db/connectToDb.js";


const Employee = sequelize.define("Employee", {
  emp_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  emp_no: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  emp_fname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  emp_lname: {
    type: DataTypes.STRING(50),
    allowNull: false,   // ✅ fixed typo
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone_no: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  doj: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address1: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  address2: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue:""
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  division: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  branch: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: "employees",
  timestamps: true, // adds createdAt & updatedAt
  paranoid: true,   // ✅ enables soft delete
});

export default Employee;

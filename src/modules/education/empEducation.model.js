import { DataTypes } from "sequelize";
import { hrms } from "../../db/connectToDb.js";
import Employee from "../employee/employee.model.js";

const Education = hrms.define(
  "Education",
  {
    edu_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    emp_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references : {
            model : "employees",
            key : "emp_id"
        }
      },
    qualification: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    institution: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    percentage: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    certifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    document_url: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "education_details",
    timestamps: true,
  }
);


Employee.hasMany(Education, { foreignKey: "emp_id", as: "education_details" });
Education.belongsTo(Employee, { foreignKey: "emp_id", as: "employees" });

export default Education;

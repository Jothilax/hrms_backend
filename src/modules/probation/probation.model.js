import sequelize from "../../db/connectToDb.js";
import { DataTypes } from "sequelize";

const Probation = sequelize.define(
  "Probation",
  {
    prob_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    emp_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "terminated"),
      defaultValue: "active",
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },is_active : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : true
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "probations",
    timestamps: true,
    paranoid: true, // enable soft delete
  }

);

export default Probation;

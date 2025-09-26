import { DataTypes } from "sequelize";
import { hrms } from "../../db/connectToDb.js";

const Branch = hrms.define(
  "Branch",
  {
    branch_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    branch_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    branch_ph : {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    branch_email : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
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
    tableName: "branch",
    timestamps: true,
    paranoid :true
  }
);

export default Branch;

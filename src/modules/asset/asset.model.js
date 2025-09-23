import { DataTypes } from "sequelize";
import sequelize from "../../db/connectToDb.js";

const Asset = sequelize.define(
  "Asset",
  {
    asset_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    asset_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    asset_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // asset_description: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // purchase_date: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    // },
    // condition: {
    //   type: DataTypes.STRING, // e.g., New, Used, Damaged
    //   allowNull: false,
    // },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
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
    tableName: "assets",
    timestamps: true,
  }
);

export default Asset;

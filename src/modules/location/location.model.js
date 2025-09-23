import { DataTypes } from "sequelize";
import sequelize from "../../db/connectToDb.js";

const Location = sequelize.define(
  "Location",
  {
    location_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // location_description: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // address: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // city: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // state: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // country: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // pincode: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
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
    tableName: "locations",
    timestamps: true,
    paranoid :true
  }
);

export default Location;

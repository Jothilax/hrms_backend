import { DataTypes } from "sequelize";
import { hrms } from "../../db/connectToDb.js";

const Department = hrms.define('dept', {
    dept_id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    dept_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
     dept_ph: {
        type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
       
    },
    dept_email: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    dept_description: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull:false
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
    tableName: 'department',
    timestamps: true  ,
    paranoid : true
});

export default Department;
import { DataTypes } from "sequelize";
import sequelize from "../../db/connectToDb.js";
import { v4 as uuidv4 } from "uuid";

const Dept = sequelize.define('dept', {
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
    timestamps: true  
});

export default Dept;
import { DataTypes } from "sequelize"; 
import sequelize from "../../db/connectToDb.js";
import Employee from "../employee/employee.model.js";

const Bank = sequelize.define("Bank",{
bank_id : {
    type: DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4,
    primaryKey: true
},
emp_id : {
    type : DataTypes.UUID,
    allowNull : false,
    references : {
        model : Employee,
        key : "emp_id"
    },
    onDelete : "CASCADE"
},
bank_name : {
    type : DataTypes.STRING(100),
    allowNull : false
},
ifsc_code : {
    type : DataTypes.STRING(25),
    allowNull : false
},
acc_holder_name : {
    type : DataTypes.STRING(100),
    allowNull : false
},
isactive : {
    type : DataTypes.BOOLEAN,
    allowNull : false,
    defaultValue : true
},
created_by : {
    type: DataTypes.UUID, 
    allowNull : true,
},
updated_by : {
    type: DataTypes.UUID, 
    allowNull : true,
}
},{
    timestamps : true,
    tableName : "emp_bank",
    paranoid : true ,
});

Employee.hasOne(Bank, { foreignKey: "emp_id" });
Bank.belongsTo(Employee, { foreignKey: "emp_id" });

export default Bank;
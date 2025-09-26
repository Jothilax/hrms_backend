// models/personnelEmployee.model.js
import { DataTypes } from "sequelize";
import { xtown } from "../../db/connectToDb.js";

const PersonnelEmployee = xtown.define("PersonnelEmployee", {
  create_time: {
    type: DataTypes.DATE(6),
    allowNull: true,
  },
  create_user: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  change_time: {
    type: DataTypes.DATE(6),
    allowNull: true,
  },
  change_user: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
  },
  emp_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(100),
  },
  last_name: {
    type: DataTypes.STRING(25),
  },
  nickname: {
    type: DataTypes.STRING(100),
  },
  passport: {
    type: DataTypes.STRING(30),
  },
  driver_license_automobile: {
    type: DataTypes.STRING(30),
  },
  driver_license_motorcycle: {
    type: DataTypes.STRING(30),
  },
  enable_outdoor_management: {
    type: DataTypes.SMALLINT,
  },
  photo: {
    type: DataTypes.STRING(200),
  },
  self_password: {
    type: DataTypes.STRING(128),
  },
  device_password: {
    type: DataTypes.STRING(20),
  },
  dev_privilege: {
    type: DataTypes.INTEGER,
  },
  card_no: {
    type: DataTypes.STRING(20),
  },
  acc_group: {
    type: DataTypes.STRING(5),
  },
  acc_timezone: {
    type: DataTypes.STRING(20),
  },
  gender: {
    type: DataTypes.STRING(1),
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
  address: {
    type: DataTypes.STRING(200),
  },
  postcode: {
    type: DataTypes.STRING(10),
  },
  office_tel: {
    type: DataTypes.STRING(20),
  },
  contact_tel: {
    type: DataTypes.STRING(20),
  },
  mobile: {
    type: DataTypes.STRING(20),
  },
  national: {
    type: DataTypes.STRING(50),
  },
  religion: {
    type: DataTypes.STRING(20),
  },
  title: {
    type: DataTypes.STRING(20),
  },
  enroll_sn: {
    type: DataTypes.STRING(20),
  },
  ssn: {
    type: DataTypes.STRING(20),
  },
  update_time: {
    type: DataTypes.DATE(6),
  },
  hire_date: {
    type: DataTypes.DATEONLY,
  },
  verify_mode: {
    type: DataTypes.INTEGER,
  },
  city: {
    type: DataTypes.STRING(20),
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  emp_type: {
    type: DataTypes.INTEGER,
  },
  enable_att: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  enable_payroll: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  enable_overtime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  enable_holiday: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  enable_whatsapp: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  whatsapp_exception: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  whatsapp_punch: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  reserved: {
    type: DataTypes.INTEGER,
  },
  del_tag: {
    type: DataTypes.INTEGER,
  },
  app_status: {
    type: DataTypes.SMALLINT,
  },
  app_role: {
    type: DataTypes.SMALLINT,
  },
  email: {
    type: DataTypes.STRING(50),
  },
  enable_sms: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  sms_exception: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  sms_punch: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  last_login: {
    type: DataTypes.DATE(6),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
  },
  location_id: {
    type: DataTypes.INTEGER,
  },
  position_id: {
    type: DataTypes.INTEGER,
  },
  company_id: {
    type: DataTypes.STRING(32),
  },
  otp: {
    type: DataTypes.STRING(8),
  },
  verified_employee: {
    type: DataTypes.INTEGER,
  },
  app_punch_status: {
    type: DataTypes.SMALLINT,
  },
  preferences: {
    type: DataTypes.JSON,
  },
}, {
  tableName: "personnel_employee",
  timestamps: false, // disable Sequelize auto timestamps since you use custom create_time/update_time
});

export default PersonnelEmployee;

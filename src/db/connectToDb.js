import { Sequelize } from "sequelize";

const sequelize = new Sequelize("hrms_demo", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
});

// const sequelize = new Sequelize("hrms_demo", "root", "jothi@2114", {
//   host: "192.168.1.150",
//   port: 3306,
//   dialect: "mysql",
// });

sequelize
  .authenticate()
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.error(`Database connection error: ${err}`));


export default sequelize ;


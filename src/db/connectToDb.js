// import { Sequelize } from "sequelize";

// const sequelize1 = new Sequelize("hrms_demo", "ramya", "ramya", {
//   host: "192.168.1.150",
//   port: 3306,
//   dialect: "mysql",
// });

// const sequelize2 = new Sequelize("hrms_demo", "root", "jothi@2114", {
//   host: "192.168.1.150",
//   port: 3306,
//   dialect: "mysql",
// });

// sequelize
//   .authenticate()
//   .then(() => console.log("Database is Connected"))
//   .catch((err) => console.error(`Database connection error: ${err}`));


// export default sequelize ;


// db1.js
import { Sequelize } from "sequelize";

export const hrms = new Sequelize("hrms_demo", "ramya", "ramya", {
    host: "192.168.1.150",
    port: 3306,
    dialect: "mysql",
});

hrms
  .authenticate()
  .then(() => console.log("hrms_demo Database is Connected"))
  .catch((err) => console.error(`hrms_demo Database connection error: ${err}`));

// db2.js
// import { Sequelize } from "sequelize";

// export const xtown = new Sequelize("xtown", "jothiXtown", "jothiXtown", {
//   host: "192.168.1.100",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,  // 30 seconds
//     idle: 10000
//   },
//   dialectOptions: {
//     connectTimeout: 30000 // increase if DB is slow to respond
//   },
// });

export const xtown = new Sequelize("xtown", "root", "jothi@2114", {
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,  // 30 seconds
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 30000 // increase if DB is slow to respond
  },
});

xtown
  .authenticate()
  .then(() => console.log("Xtowm Database is Connected"))
  .catch((err) => console.error(`xtown Database connection error: ${err}`));
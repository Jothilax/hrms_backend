// import express from "express";
// // import sequelize from './src/db/connectToDb.js';
// // testDB.js
// import { sequelizeDB1 } from "./src/db/connectToDb.js";
// import { sequelizeDB2 } from "./src/db/connectToDb.js";

// import dotenv from 'dotenv';
// import path from "path";


// import RoleRoutes from "./src/modules/role/role.routes.js";
// import DeptRoutes from "./src/modules/department/dept.routes.js";
// import BranchRoutes from "./src/modules/branch/branch.routes.js";
// import DivisionRoutes from "./src/modules/division/division.route.js";

// import EmployeeRoute from './src/modules/employee/employee.route.js';
// // import Probation from './src/modules/probation/probation.route.js';
// // import BankRoute from './src/modules/bank/empBank.route.js';

// // import AssetRoutes from "./src/modules/asset/asset.routes.js";

// // import documentRoutes from './src/modules/documents/doc.routes.js';
// import bodyParser from "body-parser";


// const app = express();
// dotenv.config();
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // Parse application/json
// app.use(bodyParser.json());

// // Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// const port = process.env.PORT || 5000;

// app.use("/api/role", RoleRoutes); // Add Role routes
// app.use("/api/department", DeptRoutes); // Add Department routes
// app.use("/api/branch", BranchRoutes); // Add Location routes
// app.use("/api/division", DivisionRoutes); // Add Location routes
// app.use('/api/employee', EmployeeRoute);

// // app.use('/api/probation', Probation);
// // app.use('/api/bank', BankRoute);

// // app.use("/api/asset", AssetRoutes); // Add Asset routes

// // Serve uploaded files statically if desired
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// // // routes
// // app.use("/api/documents", documentRoutes);

// app.listen(port, async () => {
//   try {
//     await sequelizeDB1.sync();
//     console.log(`✅ Server and hrms running on port ${port}`);

//     await sequelizeDB2.sync({alert : false});
//     console.log(`✅ Server and attanndance is running on port ${port}`);
//   } catch (err) {
//     console.error('❌ Failed to start server:', err);
//     process.exit(1);
//   }
// });


import express from "express";
import { hrms, xtown } from "./src/db/connectToDb.js";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";

// Routes
import RoleRoutes from "./src/modules/role/role.routes.js";
import DeptRoutes from "./src/modules/department/dept.routes.js";
import BranchRoutes from "./src/modules/branch/branch.routes.js";
import DivisionRoutes from "./src/modules/division/division.route.js";
import EmployeeRoute from "./src/modules/employee/employee.route.js";
import EmployeeDetailsRoute from "./src/modules/employeeDetails/employeeDetails.route.js";
import PersonnelEmployee from "./src/modules/xtown/personnelEmployee.model.js";

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/role", RoleRoutes);
app.use("/api/department", DeptRoutes);
app.use("/api/branch", BranchRoutes);
app.use("/api/division", DivisionRoutes);
app.use("/api/employee", EmployeeRoute);
app.use("/api/employeeDetails", EmployeeDetailsRoute);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = process.env.PORT || 5000;

(async () => {
  try {
    const oneEmployee = await PersonnelEmployee.findOne({ where : { first_name : "ramya" }});
    console.log("Employee record:", oneEmployee ? oneEmployee.toJSON() : "No data found");
  } catch (err) {
    console.error("❌ Query failed:", err);
  }
})();


app.listen(port, async () => {
  try {
    // await hrms.authenticate();
    // console.log("✅ Connected to hrms_demo DB");

    // await xtown.authenticate();
    // console.log("✅ Connected to attendance DB");

    // Sync both DBs without altering tables
    await hrms.sync({ alter : true }).then("Connected hrms").catch("Error hrms");
    await xtown.sync().then("Connected xtown").catch("Error xtown");

    console.log(`🚀 Server running on port ${port}`);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
});

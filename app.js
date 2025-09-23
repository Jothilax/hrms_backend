import express from "express";
import sequelize from './src/db/connectToDb.js';
import dotenv from 'dotenv';
import path from "path";

import EmployeeRoute from './src/modules/employee/employee.model.js';
import Probation from './src/modules/probation/probation.route.js';
import BankRoute from './src/modules/bank/empBank.route.js';
import RoleRoutes from "./src/modules/role/role.routes.js";
import DeptRoutes from "./src/modules/dept/dept.routes.js";
import AssetRoutes from "./src/modules/asset/asset.routes.js";
import LocationRoutes from "./src/modules/location/location.routes.js";
import documentRoutes from './src/modules/documents/doc.routes.js';
import bodyParser from "body-parser";

const app = express();
dotenv.config();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use('/api/employee', EmployeeRoute);
app.use('/api/probation', Probation);
app.use('/api/bank', BankRoute);
app.use("/api/role", RoleRoutes); // Add Role routes
app.use("/api/department", DeptRoutes); // Add Department routes
app.use("/api/asset", AssetRoutes); // Add Asset routes
app.use("/api/location", LocationRoutes); // Add Location routes
// Serve uploaded files statically if desired
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// routes
app.use("/api/documents", documentRoutes);

app.listen(port, async () => {
  try {
    await sequelize.sync();
    console.log(`✅ Server is running on port ${port}`);
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
});


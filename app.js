import express from "express";
import sequelize from './src/db/connectToDb.js';
import dotenv from 'dotenv';

import EmployeeRoute from './src/employee/employee.route.js'
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


app.listen(port, async () => {
  try {
    await sequelize.sync();
    console.log(`✅ Server is running on port ${port}`);
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
});


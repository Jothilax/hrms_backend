import PersonnelEmployee from "./personnelEmployee.model.js";

(async () => {
  try {
    await PersonnelEmployee.sync({ alter: false }); // just checks structure, won't drop
    console.log("✅ personnel_employee model is synced with xtown DB");
  } catch (err) {
    console.error("❌ Error syncing personnel_employee:", err);
  }
})();

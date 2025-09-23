import Bank from "../bank/empBank.model.js"
import Employee from "../employee/employee.model.js";

export const addBank = async(req,res)=>{
    try {

        const {emp_id , bank_name,ifsc_code,acc_holder_name} = req.body ;

        const emp = await Employee.findByPk(emp_id);
        if(!emp){
            return res.status(401).json({
                message : "Employee not found"
            });
        }
        const empbank = await Bank.create(req.body);
        return res.status(201).json({
            message : "Bank details added",
            empbank
        });
    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({ message: "Internal servr error" });
    }
}

export const getBank = async(req,res)=>{
    try {
        const { emp_id } = req.params; // <-- get emp_id from params
  
        const bankDetails = await Bank.findOne({ 
          where: { emp_id }, 
          include: Employee 
        });
        // const bankDetails = await Bank.findOne({ where : {emp_id : req.params.id}, include : Employee });

        if(!bankDetails){
            return res.status(400).json({
                message : "Bank details not found"
            });
        }
        return res.status(200).json({
            message : "Bank details fetched",
            bankDetails
        });
    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({ message: "Internal servr error" });
    }
}


// export const updateBank = async(req,res)=>{

//     try {
//         const emp = await Bank.findByPk(req.body.emp_id);
//         if(!emp){
//             return res.status(401).json({
//                 message : "Employee not found"
//             });
//         }
//         const update = await Bank.update( req.body, {
//             where: { emp_id: req.params.emp_id },
//           });
//         return res.status(200).json({
//             message : "Bank details updated successfully",
//             update
//         });
        
//     } catch (error) {
//         console.log("Error :", error);
//         return res.status(500).json({ message: "Internal servr error" });
//     }
// }

export const updateBank = async (req, res) => {
    try {
      // Take emp_id from params
      const empId = req.params.emp_id;
  
    //   const emp = await Bank.findByPk(empId);
    const emp = await Bank.findOne({ where: { emp_id: empId } });


      if (!emp) {
        return res.status(404).json({
          message: "Employee not found"
        });
      }
  
      const [updated] = await Bank.update(req.body, {
        where: { emp_id: empId },
      });
  
      if (updated === 0) {
        return res.status(400).json({ message: "Bank details not updated" });
      }
  
      return res.status(200).json({
        message: "Bank details updated successfully"
      });
  
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

export const deleteBank = async(req,res)=>{

    try {
        const bankDetails = await Bank.findOne({ where : {emp_id : req.params.emp_id}});

        if(!bankDetails){
            return res.status(400).json({
                message : "Bank details not found"
            });
        } 
        const deleteBank = await Bank.update(
            { isactive: false },  // fields to update
            { where: { emp_id: req.params.emp_id } }  // condition
        );
        return res.json({ message: "Bank details deleted successfully" });

    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({ message: "Internal servr error" });
    }
}


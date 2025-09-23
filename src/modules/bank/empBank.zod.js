// import { z } from "zod";

// export const createBankSchema = z.object(
//     {
//         emp_id : z.uuid(),
//         bank_name : z.string(),
//         ifsc_code : z.string(),
//         acc_holder_name : z.string(),
//         isactive : z.boolean().default(true),
//         created_by: z.uuid().optional(),
//         updated_by: z.uuid().optional(),
//         }
// )

//   export const updateBankSchema = z.object({
//     params: z.object({
//       emp_id: z.uuid(),
//     }),
//     body: z.object({
//       bank_name: z.string().optional(),
//       ifsc_code: z.string().optional(),
//       acc_holder_name: z.string().optional(),
//       isactive: z.boolean().default(true).optional(),
//       created_by: z.uuid().optional(),
//       updated_by: z.uuid().optional(),
//     })
//   });
  
  
//   export const deleteBankSchema = z.object({
//     params: z.object({
//         emp_id: z.uuid().optional(),
//     }),
//   });
  
//   // GET BY ID
//   export const getBankByIdSchema = z.object({
//     params: z.object({
//         emp_id: z.uuid().optional(),
//     }),
//   });


import { z } from "zod";

// CREATE
export const createBankSchema = z.object({
  body: z.object({
    emp_id: z.uuid(),
    bank_name: z.string(),
    ifsc_code: z.string(),
    acc_holder_name: z.string(),
    isactive: z.boolean().default(true),
    created_by: z.uuid().optional(),
    updated_by: z.uuid().optional(),
  }),
});

// UPDATE
export const updateBankSchema = z.object({
  params: z.object({
    emp_id: z.uuid(),
  }),
  body: z.object({
    bank_name: z.string().optional(),
    ifsc_code: z.string().optional(),
    acc_holder_name: z.string().optional(),
    isactive: z.boolean().default(true).optional(),
    created_by: z.uuid().optional(),
    updated_by: z.uuid().optional(),
  }),
});

// DELETE
export const deleteBankSchema = z.object({
  params: z.object({
    emp_id: z.uuid(),
  }),
});

// GET BY ID
export const getBankByIdSchema = z.object({
  params: z.object({
    emp_id: z.uuid(),
  }),
});

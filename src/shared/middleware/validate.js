
import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (result.body) Object.assign(req.body, result.body);
    if (result.params) Object.assign(req.params, result.params);
    if (result.query) Object.assign(req.query, result.query);

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("❌ Validation errors:", err.issues); // ✅ use .issues not .errors
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues, // ✅ fix here
      });
    }
    console.error("❌ Unexpected validation error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

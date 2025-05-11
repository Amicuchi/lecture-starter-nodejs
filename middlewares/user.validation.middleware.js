import { USER } from "../models/user.js";

// Helper function to centralize the common validation logic for creating and updating users.
// This avoids code repetition and ensures that the same format rules (email, phone, password)
// and restrictions (not allowing ID in the body, not allowing extra fields) are consistently applied
// to both operations (POST and PATCH), making the code cleaner and easier to maintain.
const validateUserCommon = (req, res, next, isUpdate = false) => {
  const userData = req.body;
  const allowedFields = Object.keys(USER);
  const receivedFields = Object.keys(userData);

  // 1. Id in the request body should NOT be present
  if (userData.hasOwnProperty("id")) {
    return res.status(400).json({ error: true, message: "User ID should not be provided in the request body." });
  }

  // 2. The presence of any extra fields (not from the models folder) is not allowed
  const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(", ")}` });
  }

  // 3. Fields format validation
  if (userData.email) {
    if (typeof userData.email !== "string" || !userData.email.endsWith("@gmail.com")) {
      return res.status(400).json({ error: true, message: "Email format is invalid. Only @gmail.com domain is allowed." });
    }
  }

  if (userData.phone) {
    if (typeof userData.phone !== "string" || !/^\+380\d{9}$/.test(userData.phone)) {
      return res.status(400).json({ error: true, message: "Phone number format is invalid. Expected format: +380xxxxxxxxx" });
    }
  }

  if (userData.password) {
    if (typeof userData.password !== "string" || userData.password.length < 3) { // As per user.js model, min 3 characters
      return res.status(400).json({ error: true, message: "Password must be a string with at least 3 characters." });
    }
  }

  // firstName and lastName are strings
  if (userData.firstName && typeof userData.firstName !== "string") {
    return res.status(400).json({ error: true, message: "First name must be a string." });
  }
  if (userData.lastName && typeof userData.lastName !== "string") {
    return res.status(400).json({ error: true, message: "Last name must be a string." });
  }

  next();
};


const createUserValid = (req, res, next) => {
  const userData = req.body;
  const requiredFields = ["firstName", "lastName", "email", "phone", "password"];
  // User validation middleware

  const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field) || userData[field] === null || userData[field] === "");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: true, message: `Missing required fields: ${missingFields.join(", ")}` });
  }

  validateUserCommon(req, res, next, false);
};

const updateUserValid = (req, res, next) => {
  const userData = req.body;
  const receivedFields = Object.keys(userData);

  // User validation middleware

  if (receivedFields.length === 0) {
    return res.status(400).json({ error: true, message: "At least one field from the model must be present for update." });
  }
  validateUserCommon(req, res, next, true);
};

export { createUserValid, updateUserValid };

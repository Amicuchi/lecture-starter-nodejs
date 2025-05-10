import { FIGHTER } from "../models/fighter.js";

const validateFighterCommon = (req, res, next, isUpdate = false) => {
  const fighterData = req.body;
  const allowedFields = Object.keys(FIGHTER);
  const receivedFields = Object.keys(fighterData);

  // 1. Id in the request body should NOT be present
  if (fighterData.hasOwnProperty("id")) {
    return res.status(400).json({ error: true, message: "Fighter ID should not be provided in the request body." });
  }

  // 2. The presence of any extra fields (not from the models folder) is not allowed
  const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(", ")}` });
  }

  // 3. Fields format validation
  if (fighterData.hasOwnProperty("name") && (typeof fighterData.name !== "string" || fighterData.name.trim() === "")) {
    return res.status(400).json({ error: true, message: "Name must be a non-empty string." });
  }

  if (fighterData.hasOwnProperty("power")) {
    const power = Number(fighterData.power);
    if (isNaN(power) || power < 1 || power > 100) {
      return res.status(400).json({ error: true, message: "Power must be a number between 1 and 100." });
    }
    fighterData.power = power; // Ensure it's a number
  }

  if (fighterData.hasOwnProperty("defense")) {
    const defense = Number(fighterData.defense);
    if (isNaN(defense) || defense < 1 || defense > 10) {
      return res.status(400).json({ error: true, message: "Defense must be a number between 1 and 10." });
    }
    fighterData.defense = defense; // Ensure it's a number
  }

  if (fighterData.hasOwnProperty("health")) {
    const health = Number(fighterData.health);
    if (isNaN(health) || health < 80 || health > 120) {
      return res.status(400).json({ error: true, message: "Health must be a number between 80 and 120." });
    }
    fighterData.health = health; // Ensure it's a number
  } else if (!isUpdate) {
    // Default health if not provided during creation and not an update
    fighterData.health = 85;
  }
  
  if (fighterData.hasOwnProperty("source") && typeof fighterData.source !== "string") {
    return res.status(400).json({ error: true, message: "Source must be a string." });
  }

  next();
};

const createFighterValid = (req, res, next) => {
  const fighterData = req.body;
  // When creating a fighter — all fields are required, except for id and health
  const requiredFields = ["name", "power", "defense"]; // health is optional with default
  const missingFields = requiredFields.filter(field => !fighterData.hasOwnProperty(field) || fighterData[field] === null || fighterData[field] === "");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: true, message: `Missing required fields for fighter creation: ${missingFields.join(", ")}` });
  }
  
  validateFighterCommon(req, res, next, false);
};

const updateFighterValid = (req, res, next) => {
  const fighterData = req.body;
  const receivedFields = Object.keys(fighterData);

  if (receivedFields.length === 0) {
    return res.status(400).json({ error: true, message: "At least one field from the model must be present for fighter update." });
  }
  validateFighterCommon(req, res, next, true);
};

export { createFighterValid, updateFighterValid };

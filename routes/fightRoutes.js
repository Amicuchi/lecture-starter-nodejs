import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
// Assume fighter IDs are sent in the request body for a fight
// No specific validation middleware for fight creation is mentioned, but basic checks can be added.

const router = Router();

router.use(responseMiddleware);

// POST /api/fight
// Body example: { fighter1Id: "some-id", fighter2Id: "another-id" }
router.post("/", (req, res) => {
  try {
    const { fighter1Id, fighter2Id } = req.body;
    if (!fighter1Id || !fighter2Id) {
      return res.badRequest("Both fighter1Id and fighter2Id are required.");
    }
    // The fight service should handle fetching fighters and the fight logic
    const fightResult = fightService.startFight(fighter1Id, fighter2Id);
    res.success(fightResult);
  } catch (error) {
    // Catch errors like "Fighter not found" or other fight logic errors
    if (error.message.includes("not found")) {
        return res.notFound(error.message);
    }
    res.badRequest(error.message);
  }
});

// GET /api/fight (Get fight history - Additional Task)
router.get("/", (req, res) => {
  try {
    const fightHistory = fightService.getFightHistory();
    res.success(fightHistory);
  } catch (error) {
    res.badRequest(error.message);
  }
});

export { router };


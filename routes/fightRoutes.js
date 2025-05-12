import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.use(responseMiddleware);

// POST /api/fight
router.post("/", (req, res) => {
  try {
    const { fighter1Id, fighter2Id } = req.body;
    if (!fighter1Id || !fighter2Id) {
      return res.badRequest("Both fighter1Id and fighter2Id are required.");
    }
    const fightResult = fightersService.createFight(fighter1Id, fighter2Id);
    res.success(fightResult);
  } catch (error) {
    if (error.message.includes("not found")) {
        return res.notFound(error.message);
    }
    res.badRequest(error.message);
  }
});

// GET /api/fight (Get fight history)
router.get("/", (req, res) => {
  try {
    const fightHistory = fightersService.getAllFights();
    res.success(fightHistory);
  } catch (error) {
    res.badRequest(error.message);
  }
});

export { router };


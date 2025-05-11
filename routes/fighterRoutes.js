import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.use(responseMiddleware); 

// GET /api/fighters
router.get("/", (req, res) => {
  try {
    const fighters = fighterService.getAll();
    res.success(fighters);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// GET /api/fighters/:id
router.get("/:id", (req, res) => {
  try {
    const fighter = fighterService.getById(req.params.id);
    if (!fighter) {
      return res.notFound("Fighter not found.");
    }
    res.success(fighter);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// POST /api/fighters
router.post("/", createFighterValid, (req, res) => {
  try {
    const newFighter = fighterService.create(req.body);
    res.success(newFighter);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// PATCH /api/fighters/:id
router.patch("/:id", updateFighterValid, (req, res) => {
  try {
    const updatedFighter = fighterService.update(req.params.id, req.body);
    if (!updatedFighter) {
      return res.notFound("Fighter not found to update.");
    }
    res.success(updatedFighter);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// DELETE /api/fighters/:id
router.delete("/:id", (req, res) => {
  try {
    const result = fighterService.delete(req.params.id);
    res.success(result);
  } catch (error) {
    if (error.message === "Fighter not found.") { 
        return res.notFound(error.message);
    }
    res.badRequest(error.message);
  }
});

export { router };

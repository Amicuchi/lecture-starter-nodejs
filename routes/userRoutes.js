import { Router } from "express";
import { userService } from "../services/userService.js";
import { 
  createUserValid, 
  updateUserValid, 
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.use(responseMiddleware);

// GET /api/users
router.get("/", (req, res) => {
  try {
    const users = userService.getAll();
    res.success(users);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// GET /api/users/:id
router.get("/:id", (req, res) => {
  try {
    const user = userService.getById(req.params.id);
    if (!user) {
      return res.notFound("User not found.");
    }
    res.success(user);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// POST /api/users
router.post("/", createUserValid, (req, res) => {
  try {
    const newUser = userService.create(req.body);
    res.success(newUser);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// PATCH /api/users/:id
router.patch("/:id", updateUserValid, (req, res) => {
  try {
    const updatedUser = userService.update(req.params.id, req.body);
    if (!updatedUser) {
      return res.notFound("User not found to update.");
    }
    res.success(updatedUser);
  } catch (error) {
    res.badRequest(error.message);
  }
});

// DELETE /api/users/:id
router.delete("/:id", (req, res) => {
  try {
    const result = userService.delete(req.params.id);
    res.success(result);
  } catch (error) {
    if (error.message === "User not found.") {
        return res.notFound(error.message);
    }
    res.badRequest(error.message);
  }
});

export { router };

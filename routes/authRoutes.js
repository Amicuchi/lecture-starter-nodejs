import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        // throw Error("Email and password are required");
        return res.badRequest("Email and password are required");
      }

      const user = authService.login({ email, password });

      // res.data = user;
      return res.success(user);

    } catch (err) {
      // res.err = err;
      return res.badRequest(err.message);
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };

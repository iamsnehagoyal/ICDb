import { Router } from "express";
import { authController } from "../controllers";
import { authenticate } from "../../middleware";

const auth = Router();

auth.post("/register", authController.register);
auth.post("/login", authController.login);
auth.delete("/logout", authenticate, authController.logout);
auth.get("/profile", authenticate, authController.profile);

export default auth;
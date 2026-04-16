import { Router } from "express";
import { createuser, loginUser, updateUser } from "./auth.controller.js";
import { isLoggedin } from "../../core/middleware/isLoggedIn.js";

const authRouter = Router();

authRouter.post("/register", createuser);
authRouter.post("/login", loginUser);
authRouter.post("/update", isLoggedin, updateUser);
export default authRouter;
import { Router } from "express";
import { createuser, loginUser, updateUser } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", createuser);
authRouter.post("/login", loginUser);
authRouter.post("/update", updateUser);

export default authRouter;
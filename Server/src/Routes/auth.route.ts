import { Router } from "express";
import { login, register } from "../Controller/auth.controller.ts";

const authRouter = Router()

authRouter.post("/register",register);
authRouter.post("/login",login);

export default authRouter;
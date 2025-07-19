import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/login", authControllers.credentialLogin);
router.post("/refresh-token", authControllers.credentialLogin);


export const AuthRoutes = router;
import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

export default router;


//express.Router() function creates a new router object that can be used to define endpoint routes
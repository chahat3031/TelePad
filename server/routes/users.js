import express from "express";
import {
  getUser,
  getUsersFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUsersFriends);

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
//This route will add or remove the user with friendId from the friends list of the user with 

export default router;

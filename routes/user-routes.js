import { Router } from "express";

import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user-controller.js";

const router = Router();

// Create user
router.post("/", createUser);

// Get user
router.get("/:id", getUser);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

export default router;

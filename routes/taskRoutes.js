const express = require("express");
const router = express.Router();

const { createTask,getTasks, getTaskById, updateTask } = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
module.exports = router;
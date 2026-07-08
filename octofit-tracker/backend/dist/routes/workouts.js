"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await workout_1.default.find().sort({ createdAt: -1 });
    res.json(workouts);
});
router.post('/', async (req, res) => {
    const { title, difficulty, durationMinutes, focus } = req.body;
    if (!title || !difficulty) {
        return res.status(400).json({ error: 'Title and difficulty are required' });
    }
    const newWorkout = await workout_1.default.create({
        title,
        difficulty,
        durationMinutes: durationMinutes || 0,
        focus,
    });
    return res.status(201).json(newWorkout);
});
exports.default = router;

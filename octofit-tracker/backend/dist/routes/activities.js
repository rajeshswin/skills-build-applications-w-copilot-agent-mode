"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await activity_1.default.find().sort({ completedAt: -1 }).populate('userId', 'name email');
    res.json(activities);
});
router.post('/', async (req, res) => {
    const { userId, type, durationMinutes, completedAt } = req.body;
    if (!userId || !type) {
        return res.status(400).json({ error: 'userId and type are required' });
    }
    const newActivity = await activity_1.default.create({
        userId,
        type,
        durationMinutes: durationMinutes || 0,
        completedAt: completedAt ? new Date(completedAt) : undefined,
    });
    return res.status(201).json(newActivity);
});
exports.default = router;

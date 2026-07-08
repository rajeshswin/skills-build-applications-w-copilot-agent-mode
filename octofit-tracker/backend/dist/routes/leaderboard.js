"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await leaderboard_1.default.find().sort({ score: -1 }).populate('userId', 'name');
    res.json(leaderboard);
});
router.post('/', async (req, res) => {
    const { userId, score, streak, rank } = req.body;
    if (!userId || typeof score !== 'number') {
        return res.status(400).json({ error: 'userId and score are required' });
    }
    const entry = await leaderboard_1.default.create({ userId, score, streak: streak || 0, rank: rank || 0 });
    return res.status(201).json(entry);
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await user_1.default.find().sort({ createdAt: -1 });
    res.json(users);
});
router.post('/', async (req, res) => {
    const { name, email, fitnessGoal, experienceLevel } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const newUser = await user_1.default.create({
        name,
        email,
        fitnessGoal: fitnessGoal || 'General fitness',
        experienceLevel,
    });
    return res.status(201).json(newUser);
});
exports.default = router;

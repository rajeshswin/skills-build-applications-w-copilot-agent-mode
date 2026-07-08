"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.default.find().sort({ createdAt: -1 });
    res.json(teams);
});
router.post('/', async (req, res) => {
    const { name, sport, members, captain } = req.body;
    if (!name || !sport) {
        return res.status(400).json({ error: 'Name and sport are required' });
    }
    const newTeam = await team_1.default.create({
        name,
        sport,
        members: members || 0,
        captain,
    });
    return res.status(201).json(newTeam);
});
exports.default = router;

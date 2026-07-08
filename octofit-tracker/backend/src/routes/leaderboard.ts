import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ score: -1 }).populate('userId', 'name');
  res.json(leaderboard);
});

router.post('/', async (req, res) => {
  const { userId, score, streak, rank } = req.body as {
    userId?: string;
    score?: number;
    streak?: number;
    rank?: number;
  };

  if (!userId || typeof score !== 'number') {
    return res.status(400).json({ error: 'userId and score are required' });
  }

  const entry = await Leaderboard.create({ userId, score, streak: streak || 0, rank: rank || 0 });
  return res.status(201).json(entry);
});

export default router;

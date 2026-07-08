import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().sort({ completedAt: -1 }).populate('userId', 'name email');
  res.json(activities);
});

router.post('/', async (req, res) => {
  const { userId, type, durationMinutes, completedAt } = req.body as {
    userId?: string;
    type?: string;
    durationMinutes?: number;
    completedAt?: string;
  };

  if (!userId || !type) {
    return res.status(400).json({ error: 'userId and type are required' });
  }

  const newActivity = await Activity.create({
    userId,
    type,
    durationMinutes: durationMinutes || 0,
    completedAt: completedAt ? new Date(completedAt) : undefined,
  });

  return res.status(201).json(newActivity);
});

export default router;

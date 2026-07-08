import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, fitnessGoal, experienceLevel } = req.body as {
    name?: string;
    email?: string;
    fitnessGoal?: string;
    experienceLevel?: string;
  };

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = await User.create({
    name,
    email,
    fitnessGoal: fitnessGoal || 'General fitness',
    experienceLevel,
  });

  return res.status(201).json(newUser);
});

export default router;

import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const { title, difficulty, durationMinutes, focus } = req.body as {
    title?: string;
    difficulty?: string;
    durationMinutes?: number;
    focus?: string;
  };

  if (!title || !difficulty) {
    return res.status(400).json({ error: 'Title and difficulty are required' });
  }

  const newWorkout = await Workout.create({
    title,
    difficulty,
    durationMinutes: durationMinutes || 0,
    focus,
  });

  return res.status(201).json(newWorkout);
});

export default router;

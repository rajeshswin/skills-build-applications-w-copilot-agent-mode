import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().sort({ createdAt: -1 });
  res.json(teams);
});

router.post('/', async (req, res) => {
  const { name, sport, members, captain } = req.body as {
    name?: string;
    sport?: string;
    members?: number;
    captain?: string;
  };

  if (!name || !sport) {
    return res.status(400).json({ error: 'Name and sport are required' });
  }

  const newTeam = await Team.create({
    name,
    sport,
    members: members || 0,
    captain,
  });

  return res.status(201).json(newTeam);
});

export default router;

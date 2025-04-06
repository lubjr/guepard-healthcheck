import { Router } from 'express';
import type { RequestHandler } from 'express';
import { TargetService } from '../services/TargetService';

const router = Router();

const createTarget: RequestHandler = (req, res): void => {
  const { name, url, checkInterval } = req.body;

  if (!name || !url || !checkInterval) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (!/^https?:\/\//.test(url)) {
    res.status(400).json({ error: 'Invalid URL format' });
    return;
  }

  const target = TargetService.create({ name, url, checkInterval });
  res.status(201).json(target);
};

router.post('/create', createTarget);

const listTargets: RequestHandler = (req, res): void => {
  const targets = TargetService.list();
  res.json(targets);
};

router.get('/list', listTargets);

export default router;
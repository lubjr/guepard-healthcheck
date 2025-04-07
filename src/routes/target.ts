import { Router } from 'express';
import type { RequestHandler } from 'express';
import { targetService } from '../modules/index';

const router = Router();

const createTarget: RequestHandler = async (req, res): Promise<void> => {
  const { name, url, checkInterval } = req.body;

  if (!name || !url || !checkInterval) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (!/^https?:\/\//.test(url)) {
    res.status(400).json({ error: 'Invalid URL format' });
    return;
  }

  try {
    const target = await targetService.create({ name, url, checkInterval });
    res.status(201).json(target);
  } catch (error: unknown) {
    console.error('Error creating target:', error);
    res.status(500).json({ error: 'Error creating target' });
  }
};

router.post('/create', createTarget);

const listTargets: RequestHandler = async (req, res): Promise<void> => {
  const targets = await targetService.list();
  res.json(targets);
};

router.get('/list', listTargets);

const getStatus: RequestHandler = async (req, res): Promise<void> => {
  const target = await targetService.getById(req.params.id);
  if (!target) {
    res.status(404).json({ error: 'Target not found' });
    return;
  }

  const sortedEntries = target.statusEntries.sort(
    (a, b) => new Date(b.checkedAt).getTime() - new Date(a.checkedAt).getTime(),
  );
  const lastStatus = sortedEntries[0] || null;

  res.json(lastStatus);
};

router.get('/:id/status', getStatus);

const getHistory: RequestHandler = async (req, res): Promise<void> => {
  const target = await targetService.getById(req.params.id);

  if (!target) {
    res.status(404).json({ error: 'Target not found' });
    return;
  }

  const history = target.statusEntries.sort(
    (a, b) => new Date(b.checkedAt).getTime() - new Date(a.checkedAt).getTime(),
  );

  res.json(history);
};

router.get('/:id/history', getHistory);

const getUptime: RequestHandler = async (req, res): Promise<void> => {
  const target = await targetService.getById(req.params.id);
  if (!target) {
    res.status(404).json({ error: 'Target not found' });
    return;
  }

  const totalChecks = target.statusEntries.length;
  if (totalChecks === 0) {
    res.json({ uptime: 0, totalChecks });
    return;
  }

  const onlineCount = target.statusEntries.filter((entry) => entry.online).length;
  const uptimePercent = Math.round((onlineCount / totalChecks) * 100);

  res.json({ uptime: uptimePercent, totalChecks });
};

router.get('/:id/uptime', getUptime);

export default router;

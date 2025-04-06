import { StatusEntry, Target } from '../types/Target';
import { randomUUID } from 'crypto';
import axios from 'axios';
import cron from 'node-cron';

const targets: Target[] = [];
const jobs: Map<string, cron.ScheduledTask> = new Map();

function secondsToCron(interval: number): string {
  if (interval < 60) {
    return `*/${interval} * * * * *`;
  }
  const minutes = Math.floor(interval / 60);
  return `*/${minutes} * * * *`;
}

function startMonitoring(target: Target) {
  const cronExpr = secondsToCron(target.checkInterval);

  const job = cron.schedule(cronExpr, async () => {
    const start = Date.now();

    const newStatus: StatusEntry = {
      online: false,
      statusCode: null,
      responseTime: null,
      checkedAt: new Date().toISOString()
    };

    try {
      const res = await axios.get(target.url, { timeout: 5000 });
      newStatus.online = true;
      newStatus.statusCode = res.status;
      newStatus.responseTime = Date.now() - start;
    } catch (err: any) {
      newStatus.online = false;
      newStatus.statusCode = err?.response?.status ?? null;
      newStatus.responseTime = Date.now() - start;
    }

    target.lastStatus = newStatus;

    if (!target.statusHistory) {
      target.statusHistory = [];
    }

    target.statusHistory.unshift(newStatus);

    if (target.statusHistory.length > 10) {
      target.statusHistory.pop();
    }
  });

  jobs.set(target.id, job);
}

export const TargetService = {
  create(data: Omit<Target, 'id' | 'lastStatus'>): Target {
    const newTarget: Target = {
      id: randomUUID(),
      ...data,
    };

    targets.push(newTarget);
    startMonitoring(newTarget);

    return newTarget;
  },

  list(): Target[] {
    return targets;
  },

  getById(id: string): Target | undefined {
    return targets.find(t => t.id === id);
  }
};

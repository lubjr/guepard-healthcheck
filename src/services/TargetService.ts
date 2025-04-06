import { Target } from '../types/Target';
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

    try {
      const res = await axios.get(target.url, { timeout: 5000 });
      const responseTime = Date.now() - start;

      target.lastStatus = {
        online: true,
        statusCode: res.status,
        responseTime,
        checkedAt: new Date().toISOString(),
      };
    } catch (err: any) {
      const responseTime = Date.now() - start;

      target.lastStatus = {
        online: false,
        statusCode: err?.response?.status ?? null,
        responseTime,
        checkedAt: new Date().toISOString(),
      };
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

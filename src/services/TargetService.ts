import axios, { AxiosError } from 'axios';
import cron from 'node-cron';
import type { StatusEntry } from '../types/Target';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jobs: Map<string, cron.ScheduledTask> = new Map();

function secondsToCron(interval: number): string {
  if (interval < 60) {
    return `*/${interval} * * * * *`;
  }
  const minutes = Math.floor(interval / 60);
  return `*/${minutes} * * * *`;
}

function startMonitoring(targetId: string, url: string, interval: number) {
  const cronExpr = secondsToCron(interval);

  const job = cron.schedule(cronExpr, async () => {
    const start = Date.now();
    const newStatus: Omit<StatusEntry, 'checkedAt'> = {
      online: false,
      statusCode: null,
      responseTime: null,
    };

    try {
      const res = await axios.get(url, { timeout: 5000 });
      newStatus.online = true;
      newStatus.statusCode = res.status;
      newStatus.responseTime = Date.now() - start;
    } catch (err: unknown) {
      const error = err as AxiosError;
      newStatus.online = false;
      newStatus.statusCode = error?.response?.status ?? null;
      newStatus.responseTime = Date.now() - start;
    }

    await prisma.statusEntry.create({
      data: {
        online: newStatus.online,
        statusCode: newStatus.statusCode,
        responseTime: newStatus.responseTime,
        target: { connect: { id: targetId } },
      },
    });

    const count = await prisma.statusEntry.count({
      where: { targetId },
    });

    if (count > 10) {
      const excess = count - 10;

      const oldEntries = await prisma.statusEntry.findMany({
        where: { targetId },
        orderBy: { checkedAt: 'asc' },
        take: excess,
      });

      const idsToDelete = oldEntries.map((entry) => entry.id);

      await prisma.statusEntry.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }
  });

  jobs.set(targetId, job);
}

export async function restoreMonitoringFromDatabase() {
  const targets = await prisma.target.findMany();

  if (targets.length === 0) {
    console.log('[MONITOR] Nenhum target encontrado no banco.');
    return;
  }

  console.log(`\n🔁 Restaurando monitoramento para ${targets.length} targets:`);

  for (const target of targets) {
    startMonitoring(target.id, target.url, target.checkInterval);

    console.log(`✅ [${target.name}] Monitorando ${target.url} a cada ${target.checkInterval}s`);
  }

  console.log('\n✅ Monitoramento restaurado com sucesso!\n');
}

export const TargetService = {
  async create(data: { name: string; url: string; checkInterval: number }) {
    const newTarget = await prisma.target.create({
      data: {
        name: data.name,
        url: data.url,
        checkInterval: data.checkInterval,
      },
    });

    startMonitoring(newTarget.id, newTarget.url, newTarget.checkInterval);

    return newTarget;
  },

  async list() {
    return await prisma.target.findMany();
  },

  async getById(id: string) {
    return await prisma.target.findUnique({
      where: { id },
      include: { statusEntries: true },
    });
  },
};

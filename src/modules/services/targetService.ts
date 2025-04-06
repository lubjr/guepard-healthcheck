import startMonitoring from '../functions/startMonitoring';
import prisma from '../../db/prisma';

export const targetService = {
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

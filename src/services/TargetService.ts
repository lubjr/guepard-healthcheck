import { Target } from '../types/Target';
import { randomUUID } from 'crypto';

const targets: Target[] = [];

export const TargetService = {
  create(data: Omit<Target, 'id'>): Target {
    const newTarget: Target = {
      id: randomUUID(),
      ...data
    };

    targets.push(newTarget);
    return newTarget;
  },

  list(): Target[] {
    return targets;
  }
};
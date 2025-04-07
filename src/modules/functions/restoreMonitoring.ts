import prisma from '../../db/prisma';
import startMonitoring from './startMonitoring';

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

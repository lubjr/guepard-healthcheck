import express from 'express';
import dotenv from 'dotenv';
import targetRoutes from './routes/target';
import { restoreMonitoringFromDatabase } from './modules/index';
import { isDatabaseConnected } from './db/checkDatabase';
import { handleNotFound, handleError } from './middlewares/responseHandler';
import { rateLimiter } from './middlewares/rateLimiter';

dotenv.config();

export async function startServer() {
  const app = express();
  const PORT = process.env.PORT;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('🚀 Guepard Health Check API is running!');
  });

  const dbConnected = await isDatabaseConnected();

  app.get('/health', (req, res) => {
    if (dbConnected) {
      res.status(200).json({ status: 'ok', database: true });
    } else {
      res.status(503).json({ status: 'degraded', database: false });
    }
  });

  if (!dbConnected) {
    console.error('❌ Banco de dados indisponível. API rodando em modo limitado.');

    app.use(handleNotFound);

    return app.listen(PORT, () => {
      console.log(`⚠️ Server em modo degradado na porta ${PORT}`);
    });
  }

  app.use('/targets', rateLimiter, targetRoutes);

  await restoreMonitoringFromDatabase();

  app.use(handleNotFound);
  app.use(handleError);

  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}

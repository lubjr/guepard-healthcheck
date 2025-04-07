import express from 'express';
import dotenv from 'dotenv';
import targetRoutes from './routes/target';
import { restoreMonitoringFromDatabase } from './modules/index';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('🚀 Guepard Health Check API is running!');
});

app.use('/targets', targetRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  restoreMonitoringFromDatabase();
});

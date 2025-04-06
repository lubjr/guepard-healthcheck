import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('🚀 Health Check API is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

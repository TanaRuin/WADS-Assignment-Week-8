import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Sequelize-based DB

dotenv.config();
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();

import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/database.js';

dotenv.config();

const port = process.env.PORT || 5001;

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Shara Shopping API running on port ${port}`);
  });
});

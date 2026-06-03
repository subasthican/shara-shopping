import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { validateEnvironment } from './config/env.js';
import { registerGracefulShutdown } from './utils/gracefulShutdown.js';

dotenv.config();
validateEnvironment();

const port = process.env.PORT || 5001;

connectDatabase()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Shara Shopping API running on port ${port}`);
    });

    registerGracefulShutdown({ server, disconnectDatabase });
  })
  .catch((error) => {
    console.error(`Failed to start Shara Shopping API: ${error.message}`);
    process.exit(1);
  });

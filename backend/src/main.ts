import './config/module-aliases';
import 'reflect-metadata';

import env from '@/config/env';

import express from 'express';
import cors from 'cors';
import { MainDataSource } from '@/config/database/data-source';
import { errorHandler } from '@/api/middlewares/error-handler';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Fununcia API');
});

app.get('/error', (req, res) => {
  throw new Error('Simulated error');
});

app.use(errorHandler);

async function main() {
  await MainDataSource.initialize();

  app.listen(env.serverPort, () => {
    console.log(`Server is running on port ${env.serverPort}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import express from 'express';
import cors from 'cors';
import { getLogger } from './utils';
import { env } from './config';
import { errorHandler, loggingMiddleware } from './api/middlewares';
import { patientRouter } from './api/routers';
import { DbSource } from './db';

(async () => {
  await DbSource.initialize();
  await DbSource.runMigrations();
  const logger = getLogger('ROOT');
  const app = express();
  app.use(cors({ origin: ['http://localhost:5173'] }));
  app.use(loggingMiddleware);
  app.get('/health', (_, res) => res.status(200).send());
  app.use('/patients', patientRouter);
  app.use('*', (_, res) => res.status(404).send({ error: 'Not Found' }));
  app.use(errorHandler);
  app.listen(env.PORT, () => logger.info(`Listening on ${env.PORT}`));
})();

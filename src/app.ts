import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import user from './routes/user';
import todo from './routes/todo';
import index from './routes/index';

import logger from './utils/logger';

dotenv.config();

const { PORT, NODE_ENV } = process.env;

if (_.isNil(PORT)) {
  logger.log('error', 'You need to set a PORT in the .env file');
  process.exit(1);
}

const PORT_N = Number.parseInt(PORT, 10);

if (_.isNil(NODE_ENV)) {
  logger.log('error', 'You need to set a NODE_ENV in the .env file');
  process.exit(1);
}

const isProd = NODE_ENV === 'production';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', index);
app.use('/users', user);
app.use('/todos', todo);

// Handle 404s
app.use((req: Request, res: Response) => {
  const err = new Error('Page Not Found.');
  return res.status(404).json({ error: err.message });
});

// Handle server errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ error: isProd ? 'Server error' : err });
});

app.listen(PORT_N, () => {
  logger.info(`Started on port ${PORT_N} in ${NODE_ENV} mode`);
});

export default app;

import 'dotenv/config';

import * as Sentry from '@sentry/node';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import './database';
import helmet from 'helmet';
import path from 'path';
import Youch from 'youch';

import DuplicatedItemError from './app/exceptions/DuplicatedItemError';
import InvalidArgumentsError from './app/exceptions/InvalidArgumentsError';
import NulledItemError from './app/exceptions/NulledItemError';
import sentryConfig from './config/sentry';
import routes from './routes';

const app = express();

Sentry.init(sentryConfig);

app.use(Sentry.Handlers.requestHandler());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  '/storage/images',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
);
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev') {
    const errors = await new Youch(err, req).toJSON();

    return res.status(500).json(errors);
  }

  if (
    err instanceof DuplicatedItemError ||
    err instanceof InvalidArgumentsError
  ) {
    return res.status(401).json({ error: err.message });
  }

  if (err instanceof NulledItemError) {
    return res.status(404).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Erro interno do servidor.' });
});

export default app;

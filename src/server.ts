import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth';
import { env } from './config/env';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: env.nodeEnv });
});

app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${env.port}`);
});

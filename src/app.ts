// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', itemRoutes);

export default app;

import 'reflect-metadata'
import express from 'express';
import 'express-async-errors';

import './database'; 
import { router } from './routes';
import { ServerError } from './errors/ServerError';

const app = express();

app.use(express.json());

app.use(router);

app.use(ServerError);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

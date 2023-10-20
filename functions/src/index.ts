import express from 'express';
import 'dotenv/config';
import routes from './routes/main.route';
import { db } from './config/db/db.connection';
import middleWares from './middlewares';
import errorHandler from './middlewares/errorHandler';
import * as functions from 'firebase-functions';
import authRoute from './routes/authRoute';
import cors from 'cors';

const app = express();
const server_port = process.env.SERVER_PORT || 3000;

db()
app.use(express.json());
middleWares(app)
app.use(routes);
app.use(authRoute)
app.use(errorHandler);

app.listen(server_port, () => {
  console.log(`server listening at http://localhost:${server_port}`);
});

export const week17_rpb = functions.https.onRequest(app);

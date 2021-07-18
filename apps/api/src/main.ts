import * as express from 'express';
import * as mongoose from 'mongoose';
import { router } from './app/routes/route';
import * as cookieParser from 'cookie-parser';

const app = express();

mongoose.connect('mongodb://localhost:27017/pfe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

app.use('/api', router);

mongoose.set('useFindAndModify', false);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

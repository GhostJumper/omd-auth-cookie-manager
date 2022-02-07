import chalk from "chalk";
import express, { Request, Response } from "express";
import morgan from "morgan";
const debug = require('debug')('app');


const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});


app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
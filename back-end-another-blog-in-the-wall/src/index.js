import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
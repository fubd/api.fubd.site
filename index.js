import http from 'http';
import path from 'path'
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './app/api/apiRouter.js';
import config from './config';

const app = express();
app.server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

api(app);

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
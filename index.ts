import 'module-alias/register';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDatabase } from "./database/mongodb";
import games from '@routes/games';

require('dotenv').config();

const app = express();

const HOST = '0.0.0.0';
const PORT: any = 443; //443

// Connect to the database
connectToDatabase();

// Importing the nessary middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use(cors());
app.use(bodyParser.json());

app.use((_req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json');
    next();
});

// All the endpoints / routes are defined here
app.use('/', games);

// Start the server
app.listen(PORT, HOST, () => {
    const beginLine = `Starting server at: https://${HOST}:${PORT}`;
    const dateLine = `${new Date()}`;
    let isLine = '=======================================================';
    console.log(`\n${isLine}\nAPI Server (${process.env.NODE_TYPE})\n${beginLine}\n${dateLine}\n${isLine}\n`);
});


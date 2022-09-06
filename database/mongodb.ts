import { Collection, MongoClient } from 'mongodb';
require('dotenv').config();

// The database collections
export const collections: {
    games?: Collection;
} = {};

// A connection to the database
export const connectToDatabase = async () => {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();

    const db = client.db(process.env.MONGO_DB);

    const gamesCollection: Collection = db.collection('games');

    collections.games = gamesCollection;

    console.log('Succesfully connected to database (MongoDB).');
};
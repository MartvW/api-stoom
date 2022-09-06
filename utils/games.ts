import { collections } from "@database/mongodb";
import { ObjectId } from "mongodb";
import { GameType } from "./schemas";

/**
 * Get all the games from the database.
 * @returns The response from the API
 */
export const getGames = async () => {
    try {
        const result = await collections.games.find({}).toArray();
        const games = result.map((game: any) => {
            return {
                id: game._id,
                name: game.name,
                price: game.price,
                players: game.players,
                type: game.type,
                age: game.age,
                time: game.time,
                photo: game.photo
            };
        });
        return {
            code: 200,
            message: games,
        };
    } catch (error) {
        return {
            code: 500,
            message: error,
        };
    }
};

/**
 * Get a game by id
 * @param id The id of the game
 * @returns The response from the API
 */
export const getGameById = async (id: string) => {
    try {
        // Get the game from the database
        const game = await collections.games.findOne(new ObjectId(id));

        if (!game) {
            return {
                code: 404,
                message: 'Game not found',
            };
        }

        return {
            code: 200,
            message: game,
        };
    } catch (error) {
        return {
            code: 500,
            message: error,
        };
    }
};

/**
 * Create a new game
 * @param game The game to create
 * @returns The response from the API
*/
export const createGame = async (game: GameType) => {
    try {
        await collections.games.insertOne(game);
        return {
            code: 200,
            message: "Game created",
        };
    } catch (error) {
        return {
            code: 500,
            message: error,
        };
    }
};

/**
 * Update a game
 * @param id The id of the game
 * @param game The game to update
 * @returns The response from the API
 */
export const updateGame = async (id: string, game: GameType) => {
    try {
        await collections.games.updateOne(
            { _id: new ObjectId(id) },
            { $set: game }
        );
        return {
            code: 200,
            message: "Game updated",
        };
    } catch (error) {
        return {
            code: 500,
            message: error,
        };
    }
};

/**
 * Delete a game
 * @param id The id of the game
 * @returns The response from the API
 */
export const deleteGame = async (id: string) => {
    try {
        await collections.games.deleteOne({ _id: new ObjectId(id) });
        return {
            code: 200,
            message: "Game deleted",
        };
    } catch (error) {
        return {
            code: 500,
            message: error,
        };
    }
};
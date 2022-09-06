import { createGame, deleteGame, getGameById, getGames, updateGame } from "@utils/games";
import { GameSchema } from "@utils/schemas";
import { Router } from 'express';
import Joi from "joi";

// Define the routes
const router = Router();

/**
 * Get all the games from the database.
 * @returns The response from the API
 */
router.get('/games', async (_req: any, res: any) => {
    const games = await getGames();

    if (games.code !== 200) {
        return res.status(games.code).send(JSON.stringify(games.message, null, 4));
    }

    res.send(JSON.stringify(games.message, null, 4));
});

/**
 * Get a game by id
 * @param req The request
 * @param res The response
 * @returns The response from the API
 */
router.get('/games/:id', async (req: any, res: any) => {
    const game = await getGameById(req.params.id);

    if (game.code !== 200) {
        return res.status(game.code).send(JSON.stringify(game.message, null, 4));
    }

    res.send(JSON.stringify(game.message, null, 4));
});

/**
 * Create a new game
 * @param req The request
 * @param res The response
 * @returns The response from the API
 */
router.post('/games', async (req: any, res: any) => {
    const schema = Joi.object(GameSchema);

    const schemaResult = schema.validate(req.body);
    if (schemaResult.error) {
        return res.status(500).send(JSON.stringify(schemaResult.error, null, 4));
    }

    const result = await createGame(req.body);

    if (result.code !== 200) {
        return res.status(result.code).send(JSON.stringify(result.message, null, 4));
    }

    res.send(JSON.stringify(result.message, null, 4));
});

/**
 * Update a game
 * @param req The request
 * @param res The response
 * @returns The response from the API
 */

router.put('/games/:id', async (req: any, res: any) => {
    const schema = Joi.object(GameSchema);

    const schemaResult = schema.validate(req.body);
    if (schemaResult.error) {
        return res.status(500).send(JSON.stringify(schemaResult.error, null, 4));
    }

    const result = await updateGame(req.params.id, req.body);

    if (result.code !== 200) {
        return res.status(result.code).send(JSON.stringify(result.message, null, 4));
    }

    res.send(JSON.stringify(result.message, null, 4));
});

/**
 * Delete a game
 * @param req The request
 * @param res The response
 * @returns The response from the API
 */

router.delete('/games/:id', async (req: any, res: any) => {
    const result = await deleteGame(req.params.id);

    if (result.code !== 200) {
        return res.status(result.code).send(JSON.stringify(result.message, null, 4));
    }

    res.send(JSON.stringify(result.message, null, 4));
});

// Export the routes
export default router;
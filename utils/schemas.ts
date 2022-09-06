import Joi from 'joi';

// Schema for TypeScript
export type GameType = {
    name: string;
    price: number;
    players: number;
    type: "adventure" | "arcade" | "rpg" | "simulation" | "strategy";
    age: number;
    time: "short" | "medium" | "long";
    photo: string;
};

// Schema for validating the request body
export const GameSchema = {
    name: Joi.string().required(),
    price: Joi.number().required(),
    players: Joi.number().required(),
    type: Joi.string().valid("adventure", "arcade", "rpg", "simulation", "strategy").required(),
    age: Joi.number().required(),
    time: Joi.string().valid("short", "medium", "long").required(),
    photo: Joi.string().required(),
};
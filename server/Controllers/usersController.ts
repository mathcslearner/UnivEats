import {Request, Response} from 'express'
import pool from '../db'

//Get meals for logged-in user
export const getUserMeals = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    const limit = parseInt(req.query.limit as string) || 10
    const offset = parseInt(req.query.offset as string) || 0

    try {
        const {rows: meals} = await pool.query(
            `SELECT * FROM meals WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        )
        res.json(meals);
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "Failed to fetch meals"})
    }
}

//Get meals for a specific user id
export const getUserMealsById = async (req: Request, res: Response) => {
    const requestedUserId = parseInt(req.params.id)

    const limit = parseInt(req.query.limit as string) || 10
    const offset = parseInt(req.query.offset as string) || 0

    try {
        const {rows: meals} = await pool.query(
            `SELECT * FROM meals WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
            [requestedUserId, limit, offset]
        )
        res.json(meals);
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "Failed to fetch meals"})
    }
}


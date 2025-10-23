import {Request, Response} from 'express'
import pool from '../db'
import 'express.d.ts'

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

//Get profile information for a specific user
export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
          "SELECT name, email, bio FROM users WHERE id = $1",
          [id]
        );

        if (rows.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(rows[0]);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
}


//Change profile information for a specific user
export const changeUserInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, bio } = req.body;

        await pool.query(
          "UPDATE users SET name = $1, email = $2, bio = $3 WHERE id = $4",
          [name, email, bio, id]
        );
        res.sendStatus(200);
      } catch (err) {
        res.status(500).json({ message: "Failed to update profile" });
      }
}

export const search = async (req: Request, res: Response) => {
    const q = (req.query.q as string || "").trim();
    if (!q) return res.json([]);

    try {
        // Only return usernames that START with `q`
        const result = await pool.query(
          "SELECT username FROM users WHERE username ILIKE $1 LIMIT 10",
          [`${q}%`] 
        );
    
        const usernames = result.rows.map((row: any) => row.username);
        res.json(usernames);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
} 



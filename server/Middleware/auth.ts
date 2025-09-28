import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'

dotenv.config()

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        (req as any).user = user;
        next();
    });
}




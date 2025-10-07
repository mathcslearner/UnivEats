import {Request, Response} from 'express'
import pool from '../db'
import 'express.d.ts'

// Get all orders made by the logged-in buyer
export const getBuyerOrders = async (req: Request, res: Response) => {
    try {
      const buyerId = req.user?.id; // assuming req.user is populated via auth middleware
      if (!buyerId) return res.status(401).json({ error: "Unauthorized" });
  
      const result = await pool.query(
        `SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC`,
        [buyerId]
      );
  
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
// Get all orders for the logged-in seller
export const getSellerOrders = async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.id;
      if (!sellerId) return res.status(401).json({ error: "Unauthorized" });
  
      const result = await pool.query(
        `SELECT * FROM orders WHERE seller_id = $1 ORDER BY created_at DESC`,
        [sellerId]
      );
  
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
      const buyerId = req.user?.id;
      if (!buyerId) return res.status(401).json({ error: "Unauthorized" });
  
      const { meal_id, seller_id, quantity, total_price, pickup_time } = req.body;
  
      if (!meal_id || !seller_id || !quantity || !total_price) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const result = await pool.query(
        `INSERT INTO orders (meal_id, buyer_id, seller_id, quantity, total_price, pickup_time)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [meal_id, buyerId, seller_id, quantity, total_price, pickup_time || null]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
// Get a specific order by ID (buyer or seller can access)
export const getSpecificOrder = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
  
      const { id } = req.params;
  
      const result = await pool.query(
        `SELECT * FROM orders WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)`,
        [id, userId]
      );
  
      if (result.rowCount === 0) return res.status(404).json({ error: "Order not found" });
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
import {Request, Response} from 'express'
import pool from '../db'
import 'express.d.ts'
  
export const getUserCart = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const result = await pool.query(
        "SELECT shopping_list FROM users WHERE id = $1",
        [userId]
      );
  
      if (result.rowCount === 0)
        return res.status(404).json({ error: "User not found" });
  
      const cart = result.rows[0].shopping_list || { items: [] };
      res.json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  };
  
export const changeUserCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { meal_id, quantity } = req.body;
  
      if (!meal_id || typeof quantity !== "number") {
        return res.status(400).json({ error: "Meal ID and quantity required" });
      }
  
      // Get current cart
      const result = await pool.query(
        "SELECT shopping_list FROM users WHERE id = $1",
        [userId]
      );
  
      if (result.rowCount === 0)
        return res.status(404).json({ error: "User not found" });
  
      let cart = result.rows[0].shopping_list || { items: [] };
  
      // Update or add item
      const index = cart.items.findIndex((item) => item.meal_id === meal_id);
      if (index >= 0) {
        cart.items[index].quantity = quantity; // update quantity
      } else {
        cart.items.push({ meal_id, quantity }); // add new item
      }
  
      // Save updated cart back to DB
      const updateResult = await pool.query(
        "UPDATE users SET shopping_list = $1 WHERE id = $2 RETURNING shopping_list",
        [cart, userId]
      );
  
      res.json(updateResult.rows[0].shopping_list);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update cart" });
    }
  };
  
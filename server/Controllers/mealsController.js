import pool from '../db'

export const uploadMealImage = (req, res) => {
    try {
        const filePath = `/Uploads/${req.file.filename}`;
        res.json({url: filePath});
    } catch (err) {
        console.error("Upload failed: ", err);
        res.status(500).json({error: "Upload failed"});
    }
}

export const createMeal = async (req, res) => {
    const {title, description, price, cuisine, dietary_tags, availability, pickup_location, image_url} = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO meals (title, description, price, cuisine, dietary_tags, availability, pickup_location, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [title, description, price, cuisine, dietary_tags, availability, pickup_location, image_url]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error("DB insert failed:", err)
        res.status(500).json({error: "DB insert failed"})
    }
}

export const getMeals = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const result = await pool.query(
            "SELECT * FROM meals ORDER BY id DESC LIMIT $1 OFFSET $2",
            [limit, offset]
        )
        res.json(result.rows)
    } catch (err) {
        console.error("DB fetch failed:", err)
        res.status(500).json({error: "DB fetch failed"})
    }
}
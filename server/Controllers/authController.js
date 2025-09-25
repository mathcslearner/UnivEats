import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from '../db';

//signup controller
export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //check if user already exists
        const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({error: "User already exists"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save user
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );

        res.status(201).json(newUser.rows[0]);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

//login controller
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //find user
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({error: "Invalid credentials"});
        }

        const user = result.rows[0];

        //check password against password_hash
        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) {
            return res.status(400).json({error: "Invalid credentials"});
        }

        //create token
        const token = jwt.sign(
            {id: user.rows[0].id, email: user.rows[0].email},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        
        res.json({token});
        
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
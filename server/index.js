import cors from 'cors'
import dotenv from "dotenv"
import express from 'express'
import authRoutes from './Routes/auth'
import { authenticateToken } from './Middleware/auth'
import mealsRoutes from './Routes/mealsRoutes'
import userRoutes from './Routes/userRoutes'

dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use('/auth', authRoutes);
app.use('/api/meals', mealsRoutes)
app.use('/api/users', userRoutes);

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
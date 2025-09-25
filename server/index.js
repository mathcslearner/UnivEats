import cors from 'cors'
import dotenv from "dotenv"
import express from 'express'
import authRoutes from './Routes/auth'
import { authenticateToken } from './Middleware/auth'

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

app.use('/auth', authRoutes);

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
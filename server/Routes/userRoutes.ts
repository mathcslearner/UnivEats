import express from 'express'
import {getUserMeals, getUserMealsById} from '../Controllers/usersController'
import {authenticateToken} from '../Middleware/auth'

const router = express.Router()

router.get('/meals', authenticateToken, getUserMeals)
router.get('/:id/meals', getUserMealsById)
import express from 'express'
import {getUserMeals, getUserMealsById} from '../Controllers/usersController'
import {authenticateToken} from '../Middleware/auth'
import {getUserInfo, changeUserInfo, search} from '../Controllers/usersController'

const router = express.Router()

router.get('/meals', authenticateToken, getUserMeals)
router.get('/:id/meals', authenticateToken, getUserMealsById)
router.get('/:id', authenticateToken, getUserInfo)
router.put('/:id', authenticateToken, changeUserInfo)
router.get('/search', authenticateToken, search)
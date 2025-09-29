import express from 'express'
import {getUserMeals, getUserMealsById} from '../Controllers/usersController'
import {authenticateToken} from '../Middleware/auth'
import {getUserInfo, changeUserInfo} from '../Controllers/usersController'

const router = express.Router()

router.get('/meals', authenticateToken, getUserMeals)
router.get('/:id/meals', getUserMealsById)
router.get('/:id', getUserInfo)
router.put('/:id', changeUserInfo)
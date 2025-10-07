import express from 'express'
import { getUserCart , changeUserCart, clearCart} from '../Controllers/cartController'
import { authenticateToken } from '../Middleware/auth'

const router = express.Router()

router.get('/', authenticateToken, getUserCart)
router.put('/', authenticateToken, changeUserCart)
router.put('/clear', authenticateToken, clearCart)
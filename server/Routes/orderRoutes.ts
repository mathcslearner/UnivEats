import express from 'express'
import {getBuyerOrders, getSellerOrders, createOrder, getSpecificOrder} from '../Controllers/orderController'
import {authenticateToken} from '../Middleware/auth'

const router = express.Router()

router.get('/buyer/:buyerId', authenticateToken, getBuyerOrders)
router.get('/seller/:sellerId', authenticateToken, getSellerOrders)
router.get('/:orderId', getSpecificOrder)
router.post('/', createOrder)
